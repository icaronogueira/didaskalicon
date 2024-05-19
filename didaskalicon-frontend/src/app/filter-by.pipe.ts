import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(posts: any[], filter: string): any[] {
    if (!posts || !filter) {
      return posts;
    }

    return posts.filter(post => {
      const searchText = filter.toLowerCase();
      return post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(searchText));
    });
  }

}
