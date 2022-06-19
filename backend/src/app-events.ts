import { App } from '@slack/bolt';

/**
 * When a user joins the team, publicly welcome them and invite people to contact them.
 */
function greetOnJoin(app: App, options: { welcomeChannel: string }) {
  app.event('team_join', async ({ event, client, logger }) => {
    try {
      // Call chat.postMessage with the built-in client
      const result = await client.chat.postMessage({
        channel: options.welcomeChannel,
        text: `New Senjun joined! :heart_eyes: Say hi to <@${event.user.id}> everyone!`,
      });
      logger.info(result);
    } catch (error) {
      logger.error(error);
    }
  });
}

function waveBackWithSkulls(app: App) {
  app.message(/\bseni\b/i, async (context) => {
    await context.client.reactions.add({
      channel: context.event.channel,
      timestamp: context.event.ts,
      name: 'skull',
    });
  });
}

/**
 * Apply the business logic of the chat bot.
 */
export function applySeniEvents(app: App, options: { welcomeChannel: string }) {
  greetOnJoin(app, options);

  waveBackWithSkulls(app);
}
