export async function getData(country, name) {
  try {
    const response = await fetch(
      `http://universities.hipolabs.com/search?country=${country}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data, status:${response.status}`);
    }

    const data = await response.json();
    return { data: data, code: response.status };
  } catch (error) {
    return { error: error.response };
  }
}

export async function getDataByCollegeName(name, country) {
  try {
    const response = await fetch(
      `http://universities.hipolabs.com/search?name=${name}&country=${country}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data, status:${response.status}`);
    }

    const data = await response.json();
    return { data: data, code: response.status };
  } catch (error) {
    return { error: error.response };
  }
}
