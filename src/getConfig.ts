import type { IParserConfig } from 'chevrotain';
import {
  lilconfigSync as configSync,
  type LilconfigResult as ConfigResultRaw,
} from 'lilconfig';

export interface PrismaAstConfig {
  parser: Pick<IParserConfig, 'nodeLocationTracking'>;
}

type ConfigResult<T> = Omit<ConfigResultRaw, 'config'> & {
  config: T;
};

const defaultConfig: PrismaAstConfig = {
  parser: { nodeLocationTracking: 'none' },
};

let config: PrismaAstConfig;
export default function getConfig(): PrismaAstConfig {
  if (config != null) return config;

  const result: ConfigResult<PrismaAstConfig> | null =
    configSync('prisma-ast').search();
  return (config = Object.assign(defaultConfig, result?.config));
}
