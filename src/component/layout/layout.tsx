import { ThemedLayout, ThemedTitle } from "@refinedev/antd";
import { Header } from "../Header/header";

function LayOut({ children }: React.PropsWithChildren) {
  return (
    <ThemedLayout
      Header={Header}
      Title={(titleProps) => <ThemedTitle {...titleProps} text="CRM System" />}>
      {children}
    </ThemedLayout>
  );
}

export default LayOut;
