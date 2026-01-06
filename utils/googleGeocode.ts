const MAPBOX_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const MAPBOX_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;


interface GeocodeResult {
  city: string;
  state: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
}

const getComponent = (components: any[], type: string): string => {
  return (
    components.find((c: any) => c.types?.includes(type))?.long_name ?? ""
  );
};

const pickContextText = (
  feature: any,
  typePrefixes: string[]
): string => {
  for (const prefix of typePrefixes) {
    if (feature?.id?.startsWith(prefix)) return feature.text || "";
  }

  const ctx: any[] = feature?.context ?? [];
  for (const prefix of typePrefixes) {
    const m = ctx.find((c) => c.id?.startsWith(prefix));
    if (m?.text) return m.text;
  }
  return "";
};

export const getAddressFromZip = async (
  zipCode: string
): Promise<GeocodeResult | null> => {
  if (!zipCode) return null;

  try {
    const url = `${MAPBOX_URL}/${encodeURIComponent(zipCode)}.json?` +
      new URLSearchParams({
        access_token: MAPBOX_KEY,
        types: "postcode",
        limit: "1",
      }).toString();

    const response = await fetch(url);
    if (!response.ok) {
      console.warn("Mapbox Geocoding HTTP error:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data?.features?.length) {
      console.warn("Invalid ZIP/postcode or no results found");
      return null;
    }
    const feature = data.features[0];
    const city =
      pickContextText(feature, ["place.", "locality.", "district.", "neighborhood."]) || "";
    const state = pickContextText(feature, ["region."]) || "";

    const country = pickContextText(feature, ["country."]) || "";

    const [lng, lat] =
      feature.center ??
      feature.geometry?.coordinates ??
      [null, null];

    return {
      city,
      state,
      country,
      latitude: typeof lat === "number" ? lat : null,
      longitude: typeof lng === "number" ? lng : null,
    };
  } catch (error) {
    console.error("Mapbox Geocoding Error:", error);
    return null;
  }
};
