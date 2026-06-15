import { Button } from "./components/Button/Button";
import { P } from "./components/P/P";

export default function Home() {
  return (
    <>
      <Button appearance="primary" arrow="right">Primary</Button>
      <Button appearance="ghost">Ghost</Button>
      <P size="l">Большой</P>
    </>
  );
}
