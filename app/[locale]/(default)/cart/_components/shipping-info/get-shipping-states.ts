'use server';

import { getCountryStates } from '~/client/management/get-country-states';

export async function getShippingStates(id: number) {
  try {
    const response = await getCountryStates(id);

    return { status: 'success', data: response };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { status: 'error', error: error.message };
    }

    return { status: 'error', error: 'An error occurred while fetching the shipping states.' };
  }
}
