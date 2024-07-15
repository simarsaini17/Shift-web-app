"use server";

export async function getData(country: string) {
  try {
    const response = await fetch(
      `http://universities.hipolabs.com/search?country=${country}`,
      { cache: "force-cache" }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data, status:${response.status}`);
    }

    const data = await response.json();
    return { data: data, statusCode: response.status };
  } catch (error: any) {
    return error.response;
  }
}

export async function getDataByCollegeName(name: string, country: string) {
  try {
    const response = await fetch(
      `http://universities.hipolabs.com/search?name=${name}&country=${country}`,
      { cache: "force-cache" }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data, status:${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.response;
  }
}
