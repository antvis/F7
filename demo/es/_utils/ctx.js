import { isMiniApp, isWeChatMiniProgram } from 'universal-env';
export var ctx = isMiniApp ? my : isWeChatMiniProgram ? wx : {};