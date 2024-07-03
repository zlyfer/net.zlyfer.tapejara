import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zdate',
})
export class zDatePipe implements PipeTransform {
  transform(value: Date): string {
    const now = new Date();
    const date = new Date(value);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const isSameDay = now.toDateString() === date.toDateString();

    if (isSameDay) {
      if (diffInSeconds < 60) {
        return `${diffInSeconds} second${diffInSeconds == 1 ? '' : 's'} ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes == 1 ? '' : 's'} ago`;
      } else {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours == 1 ? '' : 's'} ago`;
      }
    } else {
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      // Day of the month with suffix (st, nd, rd, th)
      const day = date.getDate();
      const daySuffix = this.getDaySuffix(day);

      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;

      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      return `${month} ${day}${daySuffix} ${formattedHours}:${formattedMinutes}${ampm}`;
    }
  }

  private getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'; // 4-20 is 'th'
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
