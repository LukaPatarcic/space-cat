import { fetchJson } from './index';
import { Crew } from '../types/crew';
import { Rocket } from '../types/rocket';

export const getRockets = () => fetchJson<Rocket[]>('/rockets');

export const getCrewMembers = () => fetchJson<Crew[]>('/crew');

export const getCrewMemberById = (id: string) => fetchJson<Crew>(`/crew/${id}`);
