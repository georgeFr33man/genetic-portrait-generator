import FitnessFunctionInterface from "./interfaces/FitnessFunctionInterface";
import AgentInterface from "./interfaces/AgentInterface";
import JimpImageInterface from "../graphics/interfaces/JimpImageInterface";

class FitnessFunction implements FitnessFunctionInterface {
    weight: number;
    decorator: FitnessFunctionInterface | null | undefined;

    constructor(
        weight = 1,
        decorator: FitnessFunctionInterface | null | undefined
    ) {
        this.weight = weight;
        this.decorator = decorator;
    }

    applyDecorator(agent: AgentInterface, referenceImage: JimpImageInterface): number {
        if (this.decorator) {
            return this.decorator.evaluate(agent, referenceImage);
        }

        return 0;
    }

    evaluate(agent: AgentInterface, referenceImage: JimpImageInterface): number {
        return this.performEvaluation(agent, referenceImage) * this.weight + this.applyDecorator(agent, referenceImage);
    }

    protected performEvaluation(agent: AgentInterface, referenceImage: JimpImageInterface) : number {
        return 0;
    };
}

export default FitnessFunction;
