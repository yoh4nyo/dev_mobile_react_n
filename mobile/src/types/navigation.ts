import type { Sae } from './sae';

export type RootStackParamList = {
  Home: undefined;
  SaeList: undefined;
  SaeDetail: { sae: Sae };
  AddSae: undefined;
};