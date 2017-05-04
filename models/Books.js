export default (sequelize, DataType) => {
  const Books = sequelize.define('Books', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return Books;
};

// outra forma
// export default (sequelize, DataType) => {
//     return sequelize.define('Books', {
//         id: {
//             type: DataType.INTERGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         name: {
//             type: DataType.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true
//             }
//         }
//     });
// }
