import { Model, DataTypes } from "sequelize";
import sequelize from "@src/config/db";

class FinancingParcel extends Model {
  static processParcels(spending: Record<string, string|number|Date>): Array<Record<string, string|number|Date>> {
    const limit: number = Number(spending.parcels);
    const parcels = [];
    const dueDateArr = this._processDate(spending.payday as string, limit)

    for (let i = 0; i < limit; i++) {
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

  static _processDate(buyDate: string, limit: number): Array<Date> {    
    const parcels = []
    const date = new Date(buyDate);
    var processMonth = date.getMonth() + 1;
    var year = date.getFullYear()

    for (let i = 0; i < limit; i++) {     
      if (processMonth >= 13) {
        processMonth -= 12;
        year += 1;
        const processedDate = `${year}-${processMonth}-${date.getDate()}`;

        parcels.push(processedDate);
        processMonth++;
      } else {
        const processedDate = `${year}-${processMonth}-${date.getDate()}`;

        parcels.push(processedDate);
        processMonth++;
      }
    }

    return parcels.map(value => new Date(value));
  }
};

FinancingParcel.init({
  financingParcelId: {
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

export default FinancingParcel;
