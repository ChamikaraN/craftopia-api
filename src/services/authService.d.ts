import { Secret } from "jsonwebtoken";

interface TokenPayload {
  [key: string]: any;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

declare function generateTokens(): TokenResponse;
declare function refreshAccessToken(refreshToken: string): Promise<string>;
declare function generateToken(
  payload: TokenPayload,
  expiresIn: string
): string;

export {
  TokenPayload,
  TokenResponse,
  generateTokens,
  refreshAccessToken,
  generateToken,
};
