export default function buildStartString(info: GameInfo): string {
  return `${info.description}\n
    ${info.author} - Version ${info.version} - ${info.releaseDate} \n newLine`;
}
