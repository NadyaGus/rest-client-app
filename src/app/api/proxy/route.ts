import { forwardRequest } from './proxy';
import { proxyResponse } from './responses';
import { validateProxyRequest, type ProxyRequest } from './validators';

export async function POST(request: Request) {
  try {
    const requestData: ProxyRequest = await request.json();

    const validationError = validateProxyRequest(requestData);
    if (validationError) {
      return proxyResponse.error(validationError);
    }

    const { url, method, headers, body } = requestData;
    const result = await forwardRequest(url, method, headers, body);

    if (result.error) {
      return proxyResponse.error(result.error, result.status);
    }

    return proxyResponse.success(result.status, result.body);
  } catch (error) {
    return proxyResponse.error(
      error instanceof Error
        ? `Invalid request format: ${error.message}`
        : 'Invalid request format. Please check your request data.'
    );
  }
}
