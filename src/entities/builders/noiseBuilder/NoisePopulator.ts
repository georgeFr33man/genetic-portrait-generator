import PopulationType from "../../genetics/types/PopulationType";
import AgentInterface from "../../genetics/interfaces/AgentInterface";
import PopulatorInterface from "../../genetics/interfaces/PopulatorInterface";
import BezierCurve from "../../graphics/BezierCurve";
import MathHelper from "../../../helpers/MathHelper";
import NoiseAgent from "./NoiseAgent";

class NoisePopulator implements PopulatorInterface {
    createPopulation(populationConfig: PopulationType): Array<AgentInterface> {
        let curves = [];
        for (let i = 0; i < populationConfig.size; i++) {
            curves.push(
                BezierCurve.getRandomCurve(
                    populationConfig.maxPoint,
                    MathHelper.randInt(populationConfig.nofPointsMax, populationConfig.nofPointsMin),
                    MathHelper.randInt(populationConfig.thicknessMax, populationConfig.thicknessMin),
                    populationConfig.bezierPoints,
                )
            );
        }

        return this.createAgentsFromCurves(curves);
    }

    private createAgentsFromCurves(curves: Array<BezierCurve>): Array<AgentInterface> {
        let agents: Array<AgentInterface> = [];
        curves.forEach((curve) => agents.push(new NoiseAgent(curve)));

        return agents;
    }
}

export default NoisePopulator;