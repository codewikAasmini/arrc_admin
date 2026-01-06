import moment from "moment";

export const calculateAge = (
  day: number,
  month: string,
  year: number
): number => {
  const dob = moment(`${month} ${day}, ${year}`, "MMMM DD, YYYY");
  const currentDate = moment();
  return currentDate.diff(dob, "years");
};

export const renderRole = (selectedTab: string | undefined) => {
  switch (selectedTab) {
    case "USER":
      return "USER";
    default:
      return "";
  }
};

export const propertyStatus = (selectedTab: string | undefined) => {
  switch (selectedTab) {
    case "sell":
      return "For Sale";
    case "rent":
      return "For Rent";
    case "lease":
      return "Lease";
    default:
      return "";
  }
};

  export const formatNumber = (
    value: number | string | bigint | null | undefined,
    opts: Intl.NumberFormatOptions = { maximumFractionDigits: 0 }
  ) => {
    if (value === null || value === undefined) return "";
    const n = typeof value === "bigint" ? Number(value) : Number(value);
    if (Number.isFinite(n))
      return new Intl.NumberFormat("en-US", opts).format(n);

    const s = String(value);
    const [int, frac] = s.split(".");
    const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return frac ? `${withCommas}.${frac}` : withCommas;
  };
