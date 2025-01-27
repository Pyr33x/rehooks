import { useStep } from "./index";

function Component() {
  const { currentStep, nextStep, prevStep, jumpTo, isFirstStep, isLastStep } =
    useStep({
      totalSteps: 5,
      initialStep: 2,
    });

  return (
    <div>
      <div>Current step: {currentStep}</div>
      <button onClick={prevStep}>Prev</button>
      <button onClick={nextStep}>Next</button>
      <button onClick={() => jumpTo(3)}>Jump to 3</button>
      <button onClick={() => jumpTo(0)}>Jump to 0</button>
      <button onClick={() => jumpTo(4)}>Jump to 4</button>
      <div>Is first step: {isFirstStep ? "yes" : "no"}</div>
      <div>Is last step: {isLastStep ? "yes" : "no"}</div>
    </div>
  );
}
