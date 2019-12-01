#!/usr/bin/env node

import { CgsLocator } from './cgs/CgsLocator';
import { Paths } from './fileSystem/Paths';
import { Locator } from './fileSystem/Locator';
import { TsConfig } from './bundler/TsConfig';
import { performance, PerformanceObserver } from 'perf_hooks';
import { MarkEnum, PackageJsonLike } from './types';
import { Debug } from './debug';
import { BabelConfig } from './bundler/BabelConfig';
