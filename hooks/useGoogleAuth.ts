import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '343239136814-5ktge9v65r2av4eju51bb8c8dudg6l59.apps.googleusercontent.com',
    webClientId: '343239136814-5ktge9v65r2av4eju51bb8c8dudg6l59.apps.googleusercontent.com',
  });

  return {
    request,
    response,
    promptAsync,
  };
}
