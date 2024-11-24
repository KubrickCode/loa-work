import { BootstrapConsole } from 'nestjs-console';
import { ConsoleModule } from './console.module';

const bootstrap = new BootstrapConsole({
  module: ConsoleModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    process.exit(0);
  } catch (e) {
    process.exit(1);
  }
});
