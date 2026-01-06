import { Button } from "@/components/ui/Button";
import { authenticateWithBiometric } from "./biometricAuth";

const UseBiometricButton = () => {
const handleBiometric = async () => {
  try {
    await authenticateWithBiometric();
    alert("Access granted");
  } catch (e: any) {
    alert(e.message);
  }
};


  return (
    <Button onClick={handleBiometric}>
      Use Biometric
    </Button>
  );
};

export default UseBiometricButton;
