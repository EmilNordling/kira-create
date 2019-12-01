export namespace Config {
  export function isReactProject(): boolean {
    try {
      require.resolve('react');

      return true;
    } catch (e) {
      return false;
    }
  }
}
