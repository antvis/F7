import { isMiniApp, isWeChatMiniProgram } from 'universal-env';

export const ctx = isMiniApp ? my : isWeChatMiniProgram ? wx : {};


