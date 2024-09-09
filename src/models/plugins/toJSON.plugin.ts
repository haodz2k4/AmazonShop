import { Schema } from 'mongoose';

// Tạo một interface để xác định kiểu của tùy chọn plugin nếu cần
interface ToJSONOptions {
  transform?: (doc: any, ret: any) => void;
}

// Plugin function cho schema
function toJSONPlugin(schema: Schema) {
  schema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;

      ret.id = ret._id;
      delete ret._id;
      for (const path in schema.paths) {
        const schemaPath: any = schema.paths[path];
        if (schemaPath.options && schemaPath.options.private) {
          delete ret[path];
        }
      }
    },
  } as ToJSONOptions);
}

export default toJSONPlugin;
