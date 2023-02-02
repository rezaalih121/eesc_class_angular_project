import { MyFilesizePipe } from '../pipes/my-filesize.pipe';

describe('MyFilesizePipe', () => {
  it('create an instance', () => {
    const pipe = new MyFilesizePipe();
    expect(pipe).toBeTruthy();
  });
});
