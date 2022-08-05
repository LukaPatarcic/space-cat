import { Crew } from '@type/crew';
import { Rocket } from '@type/rocket';

import { fetchJson } from './index';

export const getRockets = () => fetchJson<Rocket[]>('/rockets');

export const getCrewMembers = () => fetchJson<Crew[]>('/crew');

export const getCrewMemberById = (id: string) => fetchJson<Crew>(`/crew/${id}`);
