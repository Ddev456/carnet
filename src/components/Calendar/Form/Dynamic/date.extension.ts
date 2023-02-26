export {}

// DATE EXTENSIONS
// ================

declare global {
   interface Date {
    //   addDays(days: number, useThis?: boolean): Date;
      addDays(days: number): Date;
   }
}

Date.prototype.addDays = function(days: number): Date {
//    if (!days) return this;
//    let date = this;
//    date.setDate(date.getDate() + days);

//    return date;

const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
};
