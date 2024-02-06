import { Model, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class CreditCardParcel extends Model {
  static processParcels(spending: Record<string, string|number|Date>): Array<Record<string, string|number|Date>> {
    const limit: number = Number(spending.parcels);
    const parcels = [];
    const dueDateArr = this._processDate(new Date(spending.payday), limit)

    for (let i = 0; i < limit - 1; i++) {
      const parcel = {
        parcel: i + 1,
        totalParcels: limit,
        parcelValue: spending.parcelValue,
        dueDate: dueDateArr[i]
      }

      parcels.push(parcel);
    }

    return parcels;
  }

  static _processDate(buyDate: Date, limit: number): Array<Date> {    
    const parcels = []

    let processMonth = buyDate.getMonth() + 1;
    let year = buyDate.getFullYear()

    for (let i = 0; i < limit - 1; i++) {
      processMonth += i;
      
      if (processMonth >= 12) {
        processMonth -= 12;
        year += 1;
        const processedDate = 
          `${buyDate.getDate()}/${processMonth > 10 ? processMonth : '0' + (1 + processMonth).toString()}/${year}`;

        parcels.push(processedDate);
      } else {
        const processedDate = 
          `${buyDate.getDate()}/${processMonth > 10 ? processMonth : '0' + (1 + processMonth).toString()}/${buyDate.getFullYear()}`;

        parcels.push(processedDate);
      }
    }

    return parcels.map(value => new Date(value));
  }
};

CreditCardParcel.init({
  creditCardParcelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  parcel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalParcels: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  parcelValue: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  spendingId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
});

export default CreditCardParcel;
