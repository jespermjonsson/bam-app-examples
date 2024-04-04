# Custom screens

Replaces "drop-in" and "thank-you" screens while also adding an additional "post-thank-you" screen.

## Trying it out

Start local dev server:

```
npm install
npm run dev
```

Follow these steps to see the example in action:

1. Open http://localhost:5173/devenv/?screen=pre-call if it wasn't automatically opened when starting the dev env
2. You should see the custom screen rendered for the "drop-in" slot
3. Restart app dev env to show the custom thank-you screen: http://localhost:5173/devenv/?screen=my-custom-thank-you-screen
4. You should see the custom screen rendered for the "thank-you" slot
5. Press "Continue"
6. You should see the additional custom screen rendered for the "post-thank-you" slot
