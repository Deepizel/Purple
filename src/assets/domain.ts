let baseUrl = '';

function readTextFile(file: string | URL): string {
  const rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);

  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        var allText = rawFile.responseText;
        baseUrl = allText.replace(/\s/g, '');
      }
    }
  };
  rawFile.send(null);
  return baseUrl;
}

baseUrl = readTextFile('./assets/domain.txt');

export const EnvVariable = {
  baseUrl: baseUrl,
};
