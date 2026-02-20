import {
  company,
  social,
  home,
  work,
  services,
  contact,
  servicePackages,
  projects,
  contactChannels,
} from './content';

describe('Content module', () => {
  it('exports company data', () => {
    expect(company.name).toBe('MPDEE Development');
    expect(company.email).toBe('sendme@mpdee.info');
    expect(company.domain).toBe('mpdee.co.uk');
  });

  it('exports social links', () => {
    expect(social.length).toBeGreaterThan(0);
    expect(social.find(s => s.name === 'Email')).toBeTruthy();
  });

  it('exports home page config', () => {
    expect(home.path).toBe('/');
    expect(home.title).toContain('MPDEE');
  });

  it('exports work page config', () => {
    expect(work.path).toBe('/work');
    expect(work.label).toBe('Work');
  });

  it('exports services page config', () => {
    expect(services.path).toBe('/services');
  });

  it('exports contact page config', () => {
    expect(contact.path).toBe('/contact');
  });

  it('exports all 6 service packages', () => {
    expect(servicePackages).toHaveLength(6);
    expect(servicePackages[0].id).toBe('starter-website');
    expect(servicePackages[2].isPopular).toBe(true);
  });

  it('exports all 6 projects', () => {
    expect(projects).toHaveLength(6);
    expect(projects[0].id).toBe('lbp-website');
    expect(projects[5].id).toBe('voiceover-studio-finder');
    expect(projects.every(p => p.images.length > 0)).toBe(true);
  });

  it('exports contact channels', () => {
    expect(contactChannels).toHaveLength(3);
    expect(contactChannels.find(c => c.title === 'Email')).toBeTruthy();
  });
});
