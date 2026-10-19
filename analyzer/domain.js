// parsing url
function parseDomain(urlStr) {
  try {
    const url = new URL(urlStr);
    const hostname = url.hostname.toLowerCase();
    const domainParts = hostname.split(".");

    return {
      domain: hostname,
      protocol: url.protocol,
      isHttps: url.protocol === "https:",
      subdomain:
        domainParts.length > 2 ? domainParts[0] : null,
      rootDomain: domainParts.slice(-2).join("."),
    };
  } catch {
    return null;
  }
}

// relationship checker
function analyzeDomainRelationship(domain, linkDomain, linkProtocol) {

  // Check whether both urls point to the exact same hostname.
  const isInternal = domain === linkDomain;

  // Compare the last two domain parts to estimate the root domain.
  const currentRoot = domain.split('.').slice(-2).join('.');
  const linkRoot = linkDomain.split('.').slice(-2).join('.');

  const isSameOrganization = !isInternal && (currentRoot === linkRoot);

  return {
    isHttps: linkProtocol === "https:",
    isInternal,
    isSameOrganization,
    isExternal: !isInternal && !isSameOrganization
  };
}