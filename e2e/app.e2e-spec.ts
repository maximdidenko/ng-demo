import { Ng4CourseProjectPage } from './app.po';

describe('ng4-course-project App', () => {
  let page: Ng4CourseProjectPage;

  beforeEach(() => {
    page = new Ng4CourseProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
