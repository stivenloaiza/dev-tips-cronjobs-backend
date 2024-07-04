import { Injectable } from '@nestjs/common';
import { Logger } from './logger.interface';

@Injectable()
export class CustomLoggerService implements Logger {
  log(message: string) {
    console.log(`ℹ️ LOG: ${message}`); 
  }

  error(message: string) {
    console.error(`❌ ERROR: ${message}`); 
  }

  warn(message: string) {
    console.warn(`⚡ WARN: ${message}`); 
  }

  debug(message: string) {
    console.debug(`🐛 DEBUG: ${message}`); 
  }

  verbose(message: string) {
    console.info(`🔍 VERBOSE: ${message}`); 
  }
}
