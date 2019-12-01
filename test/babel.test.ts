import { BabelConfig } from '../src/bundler/BabelConfig';

describe('babelConfig', () => {
  it('should add plugin after', () => {
    const babelConfig = new BabelConfig();

    const index = 2;
    const testPlugin = babelConfig['plugins'][index][0];

    babelConfig.addAfter(testPlugin, ['test']);

    expect(babelConfig['plugins'][index + 1]).toEqual(['test']);;
  });

  it('should add plugin before', () => {
    const babelConfig = new BabelConfig();

    const index = 2;
    const testPlugin = babelConfig['plugins'][index][0];

    babelConfig.addBefore(testPlugin, ['test']);

    expect(babelConfig['plugins'][index]).toEqual(['test']);;
  });

  it('should remove plugin', () => {
    const babelConfig = new BabelConfig();

    const index = 2;
    const testPlugin = babelConfig['plugins'][index];

    babelConfig.remove(testPlugin[0]);

    expect(babelConfig['plugins']).not.toContainEqual(testPlugin);;
  });
});
