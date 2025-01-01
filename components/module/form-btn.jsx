import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function FormBtn({ children, className }) {
  const { pending } = useFormStatus();

  return (
    <Button
      dir="ltr"
      type="submit"
      color="primary"
      size="lg"
      fullWidth
      className={`moraba-bold ${className}`}
      radius="sm"
      isLoading={pending}
    >
      {!pending && children}
    </Button>
  );
}
