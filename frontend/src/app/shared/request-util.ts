import { HttpRequest, HttpParams } from '@angular/common/http';
import { Table } from 'primeng/table';

export class RequestUtil {

    static getRequestParams = (datatable: Table): HttpParams => {
      let params: HttpParams = new HttpParams();
      if (datatable == null) {
        return params;
      }
    
      params = params.append('page', Math.round(datatable.first / datatable.rows).toString());
      params = params.append('size', datatable.rows == null ? null : datatable.rows.toString());
    
      const direction = datatable.sortOrder === 1 ? 'ASC' : 'DESC';
      params = params.append('sort', datatable.sortField == null ? '' : datatable.sortField + ',' + direction);
    
      return params;
    }

    static getRequestParamsTableMultiSort = (datatable: Table): HttpParams => {
      let params: HttpParams = new HttpParams();
      if (datatable == null) {
          return params;
      }

      params = params.append('page', Math.round(datatable.first / datatable.rows).toString());
      params = params.append('size', datatable.rows == null ? null : datatable.rows.toString());

      const multiSort = datatable?.multiSortMeta;
      multiSort?.forEach(sort => {
          const direction = sort.order === 1 ? 'ASC' : 'DESC';
          params = params.append('sort', sort.field == null ? '' : sort.field + ',' + direction)
      });

      return params;
  }

    
  }

