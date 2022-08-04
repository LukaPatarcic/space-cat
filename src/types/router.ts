import { Crew } from './crew';

export type CrewMemberStackParamList = {
    CrewMembers: undefined;
    CrewMember: { crewMember: Crew };
};

export type TabParamList = {
    Rockets: undefined;
    RootCrewMembers: undefined;
};
