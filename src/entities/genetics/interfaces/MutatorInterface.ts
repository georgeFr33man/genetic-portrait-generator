import AgentInterface from "./AgentInterface";

interface MutatorInterface {
    mutate(agent: AgentInterface, chance: number): AgentInterface;
}

export default MutatorInterface;