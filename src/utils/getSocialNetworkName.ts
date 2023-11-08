export function extractSocialNetworkName(url: string): string | null {
    const regex = /(https?:\/\/)?(www\.)?(instagram\.com|facebook\.com|twitter\.com|telegram\.org)\/?/i;
    const matches = url.match(regex);

    if (matches) {
        const [, , , networkName] = matches;
        return networkName;
    }

    return null; // Социальная сеть не найдена
}