import { Optional, Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../config';

interface IEmailRequestAttributes {
  id: number;
  notificationRequestId: number;
  emailFrom: string;
  emailTo: string;
  cc?: string;
  subject: string;
  htmlMessage: string;
  attachments?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IEmailRequestInput extends Optional<IEmailRequestAttributes, 'id'> {}
export interface IEmailRequestOutput extends Required<IEmailRequestAttributes> {}

class EmailRequest extends Model<IEmailRequestAttributes, IEmailRequestInput> implements IEmailRequestAttributes {
  public declare id: number;

  public declare readonly createdAt: Date;

  public declare readonly updatedAt: Date;

  public declare readonly deletedAt: Date;

  notificationRequestId!: number;
  emailFrom!: string;
  emailTo!: string;
  cc!: string;
  subject!: string;
  htmlMessage!: string;
  attachments!: string;
  status!: string;
}

EmailRequest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE,
    },
    notificationRequestId: {
      field: 'notification_request_id',
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    emailFrom: {
      field: 'email_from',
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailTo: {
      field: 'email_to',
      type: DataTypes.STRING,
      allowNull: false,
    },
    cc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    htmlMessage: {
      field: 'html_message',
      type: DataTypes.STRING,
      allowNull: false,
    },
    attachments: {
      type: DataTypes.JSONB,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default EmailRequest;
