//version 1

function checkCashRegister(price, cash, cid) {
   var change = [];
   var status = "INSUFFICIENT_FUNDS";
   var dif = (cash - price) * 100;
   var koef = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
   for (var i = 0; i < cid.length; i++) {
      var cy = cid[cid.length - 1 - i][1] * 100;
      if (cy <= dif) {
         if (cy) {
            dif -= cy;
            change.push(cid[cid.length - 1 - i]);
         }
      } else {
         var k = dif / koef[cid.length - 1 - i];
         if (k >= 1) {
            k = Math.floor(k);
            dif -= koef[cid.length - 1 - i] * k;
            change.push([
               cid[cid.length - 1 - i][0],
               koef[cid.length - 1 - i] / 100 * k
            ]);
         }
      }
      if (dif === 0) {
         break;
      }
   }
   if (dif === 0) {
      var sum = 0;
      change.map(function(val) {
         sum += val[1];
      });
      cid.map(function(val) {
         sum -= val[1];
      });
      if (sum === 0) {
         change = cid;
         status = "CLOSED";
      } else {
         status = "OPEN";
      }
   } else {
      change = [];
   }
   var result = { status: status, change: change };
   return result;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

checkCashRegister(3.26, 100, [ ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100] ]);

//version 2

function checkCashRegister(price, cash, cid) {
   var change = [];
   var status = "INSUFFICIENT_FUNDS";
   var dif = cash - price;
   var koef = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
   for (var i = 0; i < cid.length; i++) {
      if (cid[cid.length - 1 - i][1] <= dif) {
         if (cid[cid.length - 1 - i][1]) {
            dif -= cid[cid.length - 1 - i][1];
            dif = Number(dif.toFixed(2));
            change.push(cid[cid.length - 1 - i]);
         }
      } else {
         var k = dif / koef[cid.length - 1 - i];

         if (k >= 1) {
            k = Number(k.toFixed(5));
            k = Math.floor(k);
            dif -= koef[cid.length - 1 - i] * k;
            dif = Number(dif.toFixed(2));
            change.push([
               cid[cid.length - 1 - i][0],
               koef[cid.length - 1 - i] * k
            ]);
         }
      }
      if (dif === 0) {
         break;
      }
   }
   if (dif === 0) {
      var sum = 0;
      change.map(function(val) {
         sum += val[1];
      });
      cid.map(function(val) {
         sum -= val[1];
      });
      if (sum === 0) {
         change = cid;
         status = "CLOSED";
      } else {
         status = "OPEN";
      }
   } else {
      change = [];
   }
   var result = { status: status, change: change };
   return result;
}

 checkCashRegister(19.5, 20, [ ["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0] ]);
