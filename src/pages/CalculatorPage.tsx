import { Masthead } from '../components/common';
import { CostCalculator, Contact } from '../components/sections';

/* Not currently routed — kept so the calculator section has somewhere to live
   if it comes back. Converted off PageHero so nothing still depends on it. */
export function CalculatorPage() {
  return (
    <main>
      <Masthead
        serial="Estimator"
        stamp="Indicative only"
        title="Cost calculator"
        lede="Move the sliders to match how you actually operate. The figure is an estimate to start a conversation, not a quote."
      />
      <CostCalculator />
      <Contact />
    </main>
  );
}
