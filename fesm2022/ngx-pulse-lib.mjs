import * as i0 from '@angular/core';
import { Injectable, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/common/http';
import { HttpHeaders, HttpRequest, HttpClientModule } from '@angular/common/http';

// BaseRestResponse is a common structure for all response types
class BaseRestResponse {
    constructor() {
        // Error code (0 for success)
        this.code = 0;
        // Error message
        this.error = '';
    }
}

// ActionResponse message is returned for any action on entity with no return data (e.d. delete)
class ActionResponse extends BaseRestResponse {
    constructor() {
        super(...arguments);
        // Entity key
        this.key = '';
        // Additional data
        this.data = '';
    }
}

// EntitiesResponse message is returned for any action returning multiple entities
class EntityResponse extends BaseRestResponse {
    constructor() {
        super(...arguments);
        // Current page (Bulk) number
        this.page = 0;
        // Size of page (items in bulk)
        this.size = 0;
        // Total number of pages
        this.pages = 0;
        // Total number of items in the query
        this.total = 0;
    }
}

// EntitiesResponse message is returned for any action returning multiple entities
class EntitiesResponse extends BaseRestResponse {
    constructor() {
        super(...arguments);
        // Current page (Bulk) number
        this.page = 0;
        // Size of page (items in bulk)
        this.size = 0;
        // Total number of pages
        this.pages = 0;
        // Total number of items in the query
        this.total = 0;
        // List of entities
        this.list = [];
    }
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, X-API-KEY, X-ACCESS-TOKEN, X-TIMEZONE, accept, origin, Cache-Control, X-Requested-With, Authorization, Content-Disposition, Content-Filename',
        'Access-Control-Exposed-Headers': 'X-API-KEY, X-ACCESS-TOKEN, X-TIMEZONE, Content-Disposition, Content-Filename',
    })
};
// Utility class for all REST services with common functions
class RestUtil {
    // Constructor with injected authentication service
    constructor(http) {
        this.http = http;
    }
    // Upload is HTTP POST action but the body is File object
    upload(file, url, ...params) {
        const resourceUrl = this.buildUrl(url, ...params);
        const formData = new FormData();
        formData.append('fileKey', file, file.name);
        const req = new HttpRequest('POST', resourceUrl, formData, {
            reportProgress: false,
            responseType: 'json',
        });
        return this.http.request(req);
    }
    // Download is HTTP GET action but the content is blob
    download(fileName, url, ...params) {
        const resourceUrl = this.buildUrl(url, ...params);
        let downloadLink = fileName;
        // extract file name
        params.forEach(p => {
            let arr = p.split('=');
            if (arr.length > 1) {
                if (arr[0].toLowerCase() === 'filename') {
                    downloadLink = arr[1];
                }
            }
        });
        // Set content type for: json / csv / xml / pdf /xslx
        let contentType = this.getMimeType(downloadLink);
        return this.http.get(resourceUrl, {
            responseType: 'blob',
            reportProgress: true,
            observe: 'events',
            headers: new HttpHeaders({ 'Content-Type': contentType })
        });
    }
    // Download2 is an alternative option to download
    download2(fileName, url, ...params) {
        let downloadLink = fileName;
        // extract file name
        params.forEach(p => {
            let arr = p.split('=');
            if (arr.length > 1) {
                if (arr[0].toLowerCase() === 'filename') {
                    downloadLink = arr[1];
                }
            }
        });
        let contentType = this.getMimeType(fileName);
        const link = document.createElement('a');
        link.href = this.buildUrl(url, ...params);
        link.download = downloadLink;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    // HTTP GET action
    get(url, ...params) {
        const resourceUrl = this.buildUrl(url, ...params);
        return this.http.get(resourceUrl, httpOptions);
    }
    // HTTP POST action
    post(url, body, ...params) {
        const resourceUrl = this.buildUrl(url, ...params);
        return this.http.post(resourceUrl, body, httpOptions);
    }
    // HTTP PUT action
    put(url, body, ...params) {
        const resourceUrl = this.buildUrl(url, ...params);
        return this.http.put(resourceUrl, body, httpOptions);
    }
    // HTTP PATCH action
    patch(url, body, ...params) {
        const resourceUrl = this.buildUrl(url, ...params);
        return this.http.patch(resourceUrl, body, httpOptions);
    }
    // HTTP DELETE action
    delete(url, ...params) {
        const resourceUrl = this.buildUrl(url, ...params);
        return this.http.delete(resourceUrl, httpOptions);
    }
    // Construct URL with parameters
    buildUrl(url, ...params) {
        return (params === null) ? url : (params.length === 0) ? url : `${url}${params && params.length > 0 ? '?' + params.join('&') : ''}`;
    }
    // Return MIME type based on file extension
    getMimeType(fileName) {
        // Set content type for: json / csv / xml / pdf /xslx
        let contentType = 'application/json';
        if (fileName.toLowerCase().endsWith('csv')) {
            contentType = 'text/csv';
        }
        else if (fileName.toLowerCase().endsWith('xml')) {
            contentType = 'text/xml';
        }
        else if (fileName.toLowerCase().endsWith('pdf')) {
            contentType = 'application/pdf';
        }
        else if (fileName.toLowerCase().endsWith('xlsx')) {
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        }
        return contentType;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: RestUtil, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: RestUtil }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: RestUtil, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.HttpClient }] });

class PulseConfig {
    constructor() {
        this.api = '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PulseConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PulseConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: PulseConfig, decorators: [{
            type: Injectable
        }] });

// List of account related actions for system administrator only 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class SysAccountsService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/sys/accounts';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Create new account
     */
    create(body) {
        return this.rest.post(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing account in the system
     */
    update(body) {
        return this.rest.put(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete account from the system and all its related content
     */
    delete(id) {
        return this.rest.delete(`${this.baseUrl}/${id}`);
    }
    /**
     * Get single account by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of accounts by query
     */
    find(search, type, status, sort, page, size) {
        const params = [];
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysAccountsService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysAccountsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysAccountsService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of audit log queries for system administrator only 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class SysAuditLogService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/sys/audit-log';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Get single log entry by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of log entries by query
     */
    find(from, to, accountId, userId, action, itemType, itemId, itemName, search, sort, page, size) {
        const params = [];
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (accountId != null) {
            params.push(`accountId=${accountId}`);
        }
        if (userId != null) {
            params.push(`userId=${userId}`);
        }
        if (action != null) {
            params.push(`action=${action}`);
        }
        if (itemType != null) {
            params.push(`itemType=${itemType}`);
        }
        if (itemId != null) {
            params.push(`itemId=${itemId}`);
        }
        if (itemName != null) {
            params.push(`itemName=${itemName}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysAuditLogService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysAuditLogService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysAuditLogService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of checkpoints queries for system administrator only 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class SysCheckpointsService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/sys/checkpoints';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Get a single checkpoint entry by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find a list of checkpoint entries by query
     */
    find(from, to, accountId, streamId, search, sort, page, size) {
        const params = [];
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (accountId != null) {
            params.push(`accountId=${accountId}`);
        }
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysCheckpointsService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysCheckpointsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysCheckpointsService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of features actions for system administrator only 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class SysFeaturesService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/sys/features';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Find list of feature
     */
    findFeatures(search, sort, page, size) {
        const params = [];
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    /**
     * Create new features group
     */
    createFeaturesGroup(body) {
        return this.rest.post(`${this.baseUrl}/groups`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing features group
     */
    updateFeaturesGroup(body) {
        return this.rest.put(`${this.baseUrl}/groups`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete features group from the system
     */
    deleteFeaturesGroup(id) {
        return this.rest.delete(`${this.baseUrl}/groups/${id}`);
    }
    /**
     * Get single features group by id
     */
    getFeaturesGroup(id) {
        return this.rest.get(`${this.baseUrl}/groups/${id}`);
    }
    /**
     * Find list of features groups
     */
    findFeaturesGroups(search, sort, page, size) {
        const params = [];
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}/groups`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysFeaturesService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysFeaturesService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysFeaturesService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of insight queries related actions for system administrator only 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class SysInsightsService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/sys/insights';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Create new insight query
     */
    createQuery(body) {
        return this.rest.post(`${this.baseUrl}/query`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing insight query
     */
    updateQuery(body) {
        return this.rest.put(`${this.baseUrl}/query`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete insight query from the system
     */
    deleteQuery(id) {
        return this.rest.delete(`${this.baseUrl}/query/${id}`);
    }
    /**
     * Get single insight query by id
     */
    getQuery(id) {
        return this.rest.get(`${this.baseUrl}/query/${id}`);
    }
    /**
     * Find list of insight queries
     */
    findQueries(accountId, streamId, search, sort, page, size) {
        const params = [];
        if (accountId != null) {
            params.push(`accountId=${accountId}`);
        }
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}/query`, ...params);
    }
    /**
     * Create new insight spec
     */
    createSpec(body) {
        return this.rest.post(`${this.baseUrl}/spec`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing insight spec
     */
    updateSpec(body) {
        return this.rest.put(`${this.baseUrl}/spec`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete insight spec from the system
     */
    deleteSpec(id) {
        return this.rest.delete(`${this.baseUrl}/spec/${id}`);
    }
    /**
     * Get single insight spec by id
     */
    getSpec(id) {
        return this.rest.get(`${this.baseUrl}/spec/${id}`);
    }
    /**
     * Find list of insight specs
     */
    findSpecs(accountId, streamId, search, sort, page, size) {
        const params = [];
        if (accountId != null) {
            params.push(`accountId=${accountId}`);
        }
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}/spec`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysInsightsService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysInsightsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysInsightsService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of members related actions for system administrator only 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class SysMembersService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/sys/members';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Create new member
     */
    create(body) {
        return this.rest.post(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing member in the system
     */
    update(body) {
        return this.rest.put(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete member from the system
     */
    delete(id) {
        return this.rest.delete(`${this.baseUrl}/${id}`);
    }
    /**
     * Get single member by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of members by query
     */
    find(accountId, userId, role, sort, page, size) {
        const params = [];
        if (accountId != null) {
            params.push(`accountId=${accountId}`);
        }
        if (userId != null) {
            params.push(`userId=${userId}`);
        }
        if (role != null) {
            params.push(`role=${role}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysMembersService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysMembersService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysMembersService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of rule templates related actions for system administrator only 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class SysRuleTemplatesService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/sys/rule-templates';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Create new rule template
     */
    create(body) {
        return this.rest.post(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing rule template
     */
    update(body) {
        return this.rest.put(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete a rule template from the system
     */
    delete(id) {
        return this.rest.delete(`${this.baseUrl}/${id}`);
    }
    /**
     * Get single rule template by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of rule templates by query
     */
    find(search, sort, page, size) {
        const params = [];
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysRuleTemplatesService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysRuleTemplatesService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysRuleTemplatesService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of rules related actions for system administrator only 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class SysRulesService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/sys/rules';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Create new rule
     */
    create(body) {
        return this.rest.post(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing rule in the system
     */
    update(body) {
        return this.rest.put(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete a rule from the system
     */
    delete(id) {
        return this.rest.delete(`${this.baseUrl}/${id}`);
    }
    /**
     * Get single rule by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of rules by query
     */
    find(accountId, streamId, search, sort, page, size) {
        const params = [];
        if (accountId != null) {
            params.push(`accountId=${accountId}`);
        }
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysRulesService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysRulesService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysRulesService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of stream related actions for system administrator only 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class SysStreamsService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/sys/streams';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Create new stream
     */
    create(body) {
        return this.rest.post(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing stream in the system
     */
    update(body) {
        return this.rest.put(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete a stream from the system
     */
    delete(id) {
        return this.rest.delete(`${this.baseUrl}/${id}`);
    }
    /**
     * Get single stream by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of streams by query
     */
    find(accountId, search, sort, page, size) {
        const params = [];
        if (accountId != null) {
            params.push(`accountId=${accountId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysStreamsService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysStreamsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysStreamsService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of users related actions for system administrator only 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class SysUsersService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/sys/users';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Create new user
     */
    create(body) {
        return this.rest.post(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing user in the system
     */
    update(body) {
        return this.rest.put(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete a user from the system
     */
    delete(id) {
        return this.rest.delete(`${this.baseUrl}/${id}`);
    }
    /**
     * Get single user by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of users by query
     */
    find(search, type, status, sort, page, size) {
        const params = [];
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    /**
     * Create new user with all its accounts memberships
     */
    createMembership(body) {
        return this.rest.post(`${this.baseUrl}/memberships`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update user's default account
     */
    setDefaultAccount(id, accountId) {
        return this.rest.patch(`${this.baseUrl}/${id}/${accountId}`, '');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysUsersService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysUsersService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SysUsersService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of integrations related actions for the operator 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class UsrInsightsService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/insights';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Find list of insights by day
     */
    getDailyInsights(dayId) {
        return this.rest.get(`${this.baseUrl}/daily/${dayId}`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrInsightsService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrInsightsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrInsightsService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of integrations related actions for the operator 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class UsrIntegrationsService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/integrations';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Create new integration
     */
    create(body) {
        return this.rest.post(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing integration
     */
    update(body) {
        return this.rest.put(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete integration from the system
     */
    delete(id) {
        return this.rest.delete(`${this.baseUrl}/${id}`);
    }
    /**
     * Get single integration by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of integrations by query
     */
    find(accountId, streamId, search, sort, page, size) {
        const params = [];
        if (accountId != null) {
            params.push(`accountId=${accountId}`);
        }
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrIntegrationsService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrIntegrationsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrIntegrationsService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of members related actions for account administrator only 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class UsrMembersService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/members';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Create new member
     */
    create(body) {
        return this.rest.post(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing member in the system
     */
    update(body) {
        return this.rest.put(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete member from the system
     */
    delete(id) {
        return this.rest.delete(`${this.baseUrl}/${id}`);
    }
    /**
     * Get single member by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of members by query
     */
    find(userId, role, sort, page, size) {
        const params = [];
        if (userId != null) {
            params.push(`userId=${userId}`);
        }
        if (role != null) {
            params.push(`role=${role}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrMembersService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrMembersService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrMembersService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of user related actions 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class UsrUserService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/user';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Authorize user, verify user exists in the system (user was already authenticated by OAuth provider)
     * The response includes access token valid for 20 minutes. The client side should renew the token before expiration using refresh-token method
     */
    authorize(body) {
        return this.rest.post(`${this.baseUrl}/authorize`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Refresh token (set new expiration time) and associate with new account if required
     * The response includes the account details and the newly refreshed token in the HTTP header X-ACCESS-TOKEN
     */
    setAccount(id) {
        return this.rest.post(`${this.baseUrl}/set-account/${id}`, '');
    }
    /**
     * Get the user's current account details
     */
    getAccount() {
        return this.rest.get(`${this.baseUrl}/get-account`);
    }
    /**
     * Get the user's current account features (aggregated list of all features in all the account's features groups)
     */
    getAccountFeatures() {
        return this.rest.get(`${this.baseUrl}/get-account-features`);
    }
    /**
     * Get all the user memberships (all accounts that the current user has access to)
     */
    getMemberships() {
        return this.rest.get(`${this.baseUrl}/memberships`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrUserService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrUserService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrUserService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of device related actions for the operator 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class UsrDevicesService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/devices';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Create new device
     */
    create() {
        return this.rest.post(`${this.baseUrl}`, '');
    }
    /**
     * Update existing device in the system
     */
    update(body) {
        return this.rest.put(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete device from the system
     */
    delete(id) {
        return this.rest.delete(`${this.baseUrl}/${id}`);
    }
    /**
     * Get single device by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of devices by query
     */
    find(streamId, search, type, status, risk, scoreRange, sort, page, size) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (risk != null) {
            params.push(`risk=${risk}`);
        }
        if (scoreRange != null) {
            params.push(`scoreRange=${scoreRange}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    /**
     * Export list of devices by query to a file with the specified format
     */
    exportFormat(format, streamId, search, type, status, risk, sort, page, size) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (risk != null) {
            params.push(`risk=${risk}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.download(`devices`, `${this.baseUrl}/export/${format}`, ...params);
    }
    /**
     * Find top 10 devices by their score filter by query
     */
    findTop(streamId, search, type, status, risk, scoreRange, sort, page, size) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (risk != null) {
            params.push(`risk=${risk}`);
        }
        if (scoreRange != null) {
            params.push(`scoreRange=${scoreRange}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}/top`, ...params);
    }
    /**
     * Find device distribution by type filtered by query
     */
    countByType(streamId, search, type, status, risk, scoreRange, sort, page, size) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (risk != null) {
            params.push(`risk=${risk}`);
        }
        if (scoreRange != null) {
            params.push(`scoreRange=${scoreRange}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}/count/by-type`, ...params);
    }
    /**
     * Find device distribution by status filtered by query
     */
    countByStatus(streamId, search, type, status, risk, scoreRange, sort, page, size) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (risk != null) {
            params.push(`risk=${risk}`);
        }
        if (scoreRange != null) {
            params.push(`scoreRange=${scoreRange}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}/count/by-status`, ...params);
    }
    /**
     * Find device distribution by action filtered by query
     */
    countByAction(streamId, search, type, status, risk, scoreRange, sort, page, size) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (risk != null) {
            params.push(`risk=${risk}`);
        }
        if (scoreRange != null) {
            params.push(`scoreRange=${scoreRange}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}/count/by-action`, ...params);
    }
    /**
     * Add tag to a device
     */
    addTag(id, tag) {
        return this.rest.post(`${this.baseUrl}/${id}/tags/${tag}`, '');
    }
    /**
     * Delete a tag from the device
     */
    deleteTag(id, tag) {
        return this.rest.delete(`${this.baseUrl}/${id}/tags/${tag}`);
    }
    /**
     * Apply action on a device
     */
    applyAction(id, action) {
        return this.rest.post(`${this.baseUrl}/${id}/action/${action}`, '');
    }
    /**
     * Get network map of devices
     */
    getNetworkMap(streamId, from, to, type, tag, id, mapType, ips) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (tag != null) {
            params.push(`tag=${tag}`);
        }
        if (id != null) {
            params.push(`id=${id}`);
        }
        if (mapType != null) {
            params.push(`mapType=${mapType}`);
        }
        if (ips != null) {
            params.push(`ips=${ips}`);
        }
        return this.rest.get(`${this.baseUrl}/network-map`, ...params);
    }
    /**
     * Get daily device report over time (daily device report includes: total devices, active devices, devices at risk)
     */
    getDeviceReportTimeline(streamId, from, to) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        return this.rest.get(`${this.baseUrl}/report/timeline`, ...params);
    }
    /**
     * Get latest device report, the Key contains latest devices at risk number (works in account level)
     */
    getLatestDeviceReport() {
        return this.rest.get(`${this.baseUrl}/report/latest`);
    }
    /**
     * Get device / group of devices consumption over time
     */
    getConsumptionTimeline(streamId, from, to, type, tag, id) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (tag != null) {
            params.push(`tag=${tag}`);
        }
        if (id != null) {
            params.push(`id=${id}`);
        }
        return this.rest.get(`${this.baseUrl}/consumption/timeline`, ...params);
    }
    /**
     * Get device / group of devices consumption over time
     */
    getConsumptionTrend(streamId, from, to, type, tag, id) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (tag != null) {
            params.push(`tag=${tag}`);
        }
        if (id != null) {
            params.push(`id=${id}`);
        }
        return this.rest.get(`${this.baseUrl}/consumption/trend`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrDevicesService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrDevicesService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrDevicesService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of events related actions for the operator 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class UsrEventsService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/events';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Get single event by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of events by query
     */
    find(streamId, deviceId, search, from, to, type, severity, category, status, ruleId, targetIp, ruleType, sort, page, size, withoutOccurrences) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (deviceId != null) {
            params.push(`deviceId=${deviceId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (severity != null) {
            params.push(`severity=${severity}`);
        }
        if (category != null) {
            params.push(`category=${category}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (ruleId != null) {
            params.push(`ruleId=${ruleId}`);
        }
        if (targetIp != null) {
            params.push(`targetIp=${targetIp}`);
        }
        if (ruleType != null) {
            params.push(`ruleType=${ruleType}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        if (withoutOccurrences != null) {
            params.push(`withoutOccurrences=${withoutOccurrences}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    /**
     * Export list of events by query to a file with the specified format
     */
    exportFormat(format, streamId, deviceId, search, from, to, type, severity, category, status, ruleId, targetIp, ruleType, sort, page, size) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (deviceId != null) {
            params.push(`deviceId=${deviceId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (severity != null) {
            params.push(`severity=${severity}`);
        }
        if (category != null) {
            params.push(`category=${category}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (ruleId != null) {
            params.push(`ruleId=${ruleId}`);
        }
        if (targetIp != null) {
            params.push(`targetIp=${targetIp}`);
        }
        if (ruleType != null) {
            params.push(`ruleType=${ruleType}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.download(`events`, `${this.baseUrl}/export/${format}`, ...params);
    }
    /**
     * Find top 10 events by their severity filter by query
     */
    getTop(streamId, deviceId, search, from, to, type, severity, category, status, ruleId, targetIp, ruleType, sort, page, size, withoutOccurrences) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (deviceId != null) {
            params.push(`deviceId=${deviceId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (severity != null) {
            params.push(`severity=${severity}`);
        }
        if (category != null) {
            params.push(`category=${category}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (ruleId != null) {
            params.push(`ruleId=${ruleId}`);
        }
        if (targetIp != null) {
            params.push(`targetIp=${targetIp}`);
        }
        if (ruleType != null) {
            params.push(`ruleType=${ruleType}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        if (withoutOccurrences != null) {
            params.push(`withoutOccurrences=${withoutOccurrences}`);
        }
        return this.rest.get(`${this.baseUrl}/top`, ...params);
    }
    /**
     * Get top malicious IPs
     */
    getTopMaliciousIPs(streamId, top, from, to) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (top != null) {
            params.push(`top=${top}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        return this.rest.get(`${this.baseUrl}/top-malicious-ips`, ...params);
    }
    /**
     * Find events distribution by type filtered by query
     */
    countByType(streamId, deviceId, search, from, to, type, severity, category, status, ruleId, targetIp, ruleType, sort, page, size, withoutOccurrences) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (deviceId != null) {
            params.push(`deviceId=${deviceId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (severity != null) {
            params.push(`severity=${severity}`);
        }
        if (category != null) {
            params.push(`category=${category}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (ruleId != null) {
            params.push(`ruleId=${ruleId}`);
        }
        if (targetIp != null) {
            params.push(`targetIp=${targetIp}`);
        }
        if (ruleType != null) {
            params.push(`ruleType=${ruleType}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        if (withoutOccurrences != null) {
            params.push(`withoutOccurrences=${withoutOccurrences}`);
        }
        return this.rest.get(`${this.baseUrl}/count/by-type`, ...params);
    }
    /**
     * Find events distribution by status filtered by query
     */
    countByStatus(streamId, deviceId, search, from, to, type, severity, category, status, ruleId, targetIp, ruleType, sort, page, size, withoutOccurrences) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (deviceId != null) {
            params.push(`deviceId=${deviceId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (severity != null) {
            params.push(`severity=${severity}`);
        }
        if (category != null) {
            params.push(`category=${category}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (ruleId != null) {
            params.push(`ruleId=${ruleId}`);
        }
        if (targetIp != null) {
            params.push(`targetIp=${targetIp}`);
        }
        if (ruleType != null) {
            params.push(`ruleType=${ruleType}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        if (withoutOccurrences != null) {
            params.push(`withoutOccurrences=${withoutOccurrences}`);
        }
        return this.rest.get(`${this.baseUrl}/count/by-status`, ...params);
    }
    /**
     * Find events distribution by severity filtered by query
     */
    countBySeverity(streamId, deviceId, search, from, to, type, severity, category, status, ruleId, targetIp, ruleType, sort, page, size, withoutOccurrences) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (deviceId != null) {
            params.push(`deviceId=${deviceId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (severity != null) {
            params.push(`severity=${severity}`);
        }
        if (category != null) {
            params.push(`category=${category}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (ruleId != null) {
            params.push(`ruleId=${ruleId}`);
        }
        if (targetIp != null) {
            params.push(`targetIp=${targetIp}`);
        }
        if (ruleType != null) {
            params.push(`ruleType=${ruleType}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        if (withoutOccurrences != null) {
            params.push(`withoutOccurrences=${withoutOccurrences}`);
        }
        return this.rest.get(`${this.baseUrl}/count/by-severity`, ...params);
    }
    /**
     * Find events distribution by rule filtered by query
     */
    countByRule(streamId, deviceId, search, from, to, type, severity, category, status, ruleId, targetIp, ruleType, sort, page, size, withoutOccurrences) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (deviceId != null) {
            params.push(`deviceId=${deviceId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (severity != null) {
            params.push(`severity=${severity}`);
        }
        if (category != null) {
            params.push(`category=${category}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (ruleId != null) {
            params.push(`ruleId=${ruleId}`);
        }
        if (targetIp != null) {
            params.push(`targetIp=${targetIp}`);
        }
        if (ruleType != null) {
            params.push(`ruleType=${ruleType}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        if (withoutOccurrences != null) {
            params.push(`withoutOccurrences=${withoutOccurrences}`);
        }
        return this.rest.get(`${this.baseUrl}/count/by-rule`, ...params);
    }
    /**
     * Find events distribution by category filtered by query
     */
    countByCategory(streamId, deviceId, search, from, to, type, severity, category, status, ruleId, targetIp, ruleType, sort, page, size, withoutOccurrences) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (deviceId != null) {
            params.push(`deviceId=${deviceId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (severity != null) {
            params.push(`severity=${severity}`);
        }
        if (category != null) {
            params.push(`category=${category}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (ruleId != null) {
            params.push(`ruleId=${ruleId}`);
        }
        if (targetIp != null) {
            params.push(`targetIp=${targetIp}`);
        }
        if (ruleType != null) {
            params.push(`ruleType=${ruleType}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        if (withoutOccurrences != null) {
            params.push(`withoutOccurrences=${withoutOccurrences}`);
        }
        return this.rest.get(`${this.baseUrl}/count/by-category`, ...params);
    }
    /**
     * Set event status
     */
    applyAction(id, status) {
        return this.rest.post(`${this.baseUrl}/${id}/status/${status}`, '');
    }
    /**
     * Get current shieldex value as ActionResponse, the Key contains the shield index and the data includes the trend
     */
    getShieldex() {
        return this.rest.get(`${this.baseUrl}/shieldex`);
    }
    /**
     * Get histogram of events over time by dimension (type | severity | status | ruleType | category)
     */
    eventsTimeline(streamId, deviceId, dimension, from, to, type, severity, category, status, ruleId, targetIp, ruleType, sort, page, size) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (deviceId != null) {
            params.push(`deviceId=${deviceId}`);
        }
        if (dimension != null) {
            params.push(`dimension=${dimension}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (severity != null) {
            params.push(`severity=${severity}`);
        }
        if (category != null) {
            params.push(`category=${category}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (ruleId != null) {
            params.push(`ruleId=${ruleId}`);
        }
        if (targetIp != null) {
            params.push(`targetIp=${targetIp}`);
        }
        if (ruleType != null) {
            params.push(`ruleType=${ruleType}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}/timeline`, ...params);
    }
    /**
     * Get histogram of shieldex values over time
     */
    shieldexTimeline(streamId, from, to) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        return this.rest.get(`${this.baseUrl}/shieldex/timeline`, ...params);
    }
    /**
     * Export event source file
     */
    exportSource(id, timestamp) {
        const params = [];
        if (timestamp != null) {
            params.push(`timestamp=${timestamp}`);
        }
        return this.rest.download(`events`, `${this.baseUrl}/${id}/export_source`, ...params);
    }
    /**
     * Get total number devices at risk (affected by the events matching the query)
     */
    getTotalDevicesAtRisk(streamId, search, from, to, type, severity, category, status, ruleId, targetIp, ruleType) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        if (type != null) {
            params.push(`type=${type}`);
        }
        if (severity != null) {
            params.push(`severity=${severity}`);
        }
        if (category != null) {
            params.push(`category=${category}`);
        }
        if (status != null) {
            params.push(`status=${status}`);
        }
        if (ruleId != null) {
            params.push(`ruleId=${ruleId}`);
        }
        if (targetIp != null) {
            params.push(`targetIp=${targetIp}`);
        }
        if (ruleType != null) {
            params.push(`ruleType=${ruleType}`);
        }
        return this.rest.get(`${this.baseUrl}/devices-at-risk`, ...params);
    }
    /**
     * Get malicious IP data card for specific malicious IP
     */
    getMaliciousIpCard(streamId, targetIp, from, to) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (targetIp != null) {
            params.push(`targetIp=${targetIp}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        return this.rest.get(`${this.baseUrl}/malicious-ip-card`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrEventsService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrEventsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrEventsService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of events related actions for the operator 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class UsrReportsService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/reports';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Get compliance report
     */
    getComplianceReport(streamId, from, to) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        return this.rest.download(`reports`, `${this.baseUrl}/compliance`, ...params);
    }
    /**
     * Get histogram of network activity over time
     */
    getNetworkActivityOverTime(streamId, from, to) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        return this.rest.get(`${this.baseUrl}/network-activity-over-time`, ...params);
    }
    /**
     * Get histogram of device distribution by number of destinations
     */
    getDeviceDistributionByNumberOfDestinations(streamId, from, to) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        return this.rest.get(`${this.baseUrl}/device-distribution-by-number-of-destinations`, ...params);
    }
    /**
     * Get histogram of device distribution by communication frequency
     */
    getDeviceGroupsByCommunicationFrequency(streamId, from, to) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (from != null) {
            params.push(`from=${from}`);
        }
        if (to != null) {
            params.push(`to=${to}`);
        }
        return this.rest.get(`${this.baseUrl}/device-groups-by-communication-frequency`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrReportsService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrReportsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrReportsService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

// List of rules related actions 
// @RequestHeader X-API-KEY The key to identify the application (console) 
// @RequestHeader X-ACCESS-TOKEN The token to identify the logged-in user 
class UsrRulesService {
    // Class constructor
    constructor(config, rest) {
        this.config = config;
        this.rest = rest;
        // URL to web api
        this.baseUrl = '/rules';
        this.baseUrl = this.config.api + this.baseUrl;
    }
    /**
     * Create new rule
     */
    create(body) {
        return this.rest.post(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Update existing rule in the system
     */
    update(body) {
        return this.rest.put(`${this.baseUrl}`, typeof body === 'object' ? JSON.stringify(body) : body);
    }
    /**
     * Delete a rule from the system
     */
    delete(id) {
        return this.rest.delete(`${this.baseUrl}/${id}`);
    }
    /**
     * Get single rule by id
     */
    get(id) {
        return this.rest.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Find list of rules by query
     */
    find(streamId, search, sort, page, size) {
        const params = [];
        if (streamId != null) {
            params.push(`streamId=${streamId}`);
        }
        if (search != null) {
            params.push(`search=${search}`);
        }
        if (sort != null) {
            params.push(`sort=${sort}`);
        }
        if (page != null) {
            params.push(`page=${page}`);
        }
        if (size != null) {
            params.push(`size=${size}`);
        }
        return this.rest.get(`${this.baseUrl}`, ...params);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrRulesService, deps: [{ token: 'config' }, { token: RestUtil }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrRulesService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: UsrRulesService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: PulseConfig, decorators: [{
                    type: Inject,
                    args: ['config']
                }] }, { type: RestUtil }] });

const Services = [
    SysAccountsService,
    SysAuditLogService,
    SysCheckpointsService,
    SysFeaturesService,
    SysInsightsService,
    SysMembersService,
    SysRuleTemplatesService,
    SysRulesService,
    SysStreamsService,
    SysUsersService,
    UsrInsightsService,
    UsrIntegrationsService,
    UsrMembersService,
    UsrUserService,
    UsrDevicesService,
    UsrEventsService,
    UsrReportsService,
    UsrRulesService,
];

class NgxPulseLibModule {
    static forRoot(config) {
        return {
            ngModule: NgxPulseLibModule,
            providers: [
                { provide: 'config', useValue: config },
                RestUtil,
                ...Services
            ]
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: NgxPulseLibModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.2", ngImport: i0, type: NgxPulseLibModule, imports: [CommonModule, HttpClientModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: NgxPulseLibModule, imports: [CommonModule, HttpClientModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: NgxPulseLibModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, HttpClientModule]
                }]
        }] });

// Account role represents the role of the user in the account
class AccountRole {
    constructor(accountId, accountName, role) {
        if (accountId !== undefined) {
            this.accountId = accountId;
        }
        if (accountName !== undefined) {
            this.accountName = accountName;
        }
        if (role !== undefined) {
            this.role = role;
        }
    }
}

// A set of input, output data values
class ConsumptionData {
    constructor(dataIn, dataOut, total) {
        if (dataIn !== undefined) {
            this.dataIn = dataIn;
        }
        if (dataOut !== undefined) {
            this.dataOut = dataOut;
        }
        if (total !== undefined) {
            this.total = total;
        }
    }
}

// ConsumptionTimeDataPoint model represents a 2 dimensions datapoint in time
class ConsumptionTimeDataPoint {
    constructor(timestamp, value) {
        if (timestamp !== undefined) {
            this.timestamp = timestamp;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
}

// EventSeverityConfig is a list of event severity configuration
class EventSeverityConfig {
    constructor(severityConfigs) {
        if (severityConfigs !== undefined) {
            this.severityConfigs = severityConfigs;
        }
    }
}

// Key Value float tuple
class FloatKeyValue {
    constructor(key, value) {
        if (key !== undefined) {
            this.key = key;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
}

// GeoData model represents Geographic data associated with IP
// This structure is based on the Elasticsearch GeoIP pipeline fetching data from MaxMind database
class GeoData {
    constructor(countryIsoCode, countryName, regionIsoCode, regionName, cityName, location) {
        if (countryIsoCode !== undefined) {
            this.country_iso_code = countryIsoCode;
        }
        if (countryName !== undefined) {
            this.country_name = countryName;
        }
        if (regionIsoCode !== undefined) {
            this.region_iso_code = regionIsoCode;
        }
        if (regionName !== undefined) {
            this.region_name = regionName;
        }
        if (cityName !== undefined) {
            this.city_name = cityName;
        }
        if (location !== undefined) {
            this.location = location;
        }
    }
}

// GraphSeries model represents a generic set of data points over interval
class GraphSeries {
    constructor(name, values) {
        if (name !== undefined) {
            this.name = name;
        }
        if (values !== undefined) {
            this.values = values;
        }
    }
}

// Indicator model represents a feature and feature value within a normal range
class Indicator {
    constructor(name, significance, min, max, actual) {
        if (name !== undefined) {
            this.name = name;
        }
        if (significance !== undefined) {
            this.significance = significance;
        }
        if (min !== undefined) {
            this.min = min;
        }
        if (max !== undefined) {
            this.max = max;
        }
        if (actual !== undefined) {
            this.actual = actual;
        }
    }
}

// Key: int Value SeriesData  tuple
class IntKeySeriesDataValue {
    constructor(key, value) {
        if (key !== undefined) {
            this.key = key;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
}

// Key Value int tuple
class IntKeyValue {
    constructor(key, value) {
        if (key !== undefined) {
            this.key = key;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
}

// Interval represents a finite int window (from - to)
class Interval {
    constructor(from, to) {
        if (from !== undefined) {
            this.from = from;
        }
        if (to !== undefined) {
            this.to = to;
        }
    }
}

// Link represents a relation between two nodes
class Link {
    constructor(id, name, src, dst, value, severity, eventCount) {
        if (id !== undefined) {
            this.id = id;
        }
        if (name !== undefined) {
            this.name = name;
        }
        if (src !== undefined) {
            this.src = src;
        }
        if (dst !== undefined) {
            this.dst = dst;
        }
        if (value !== undefined) {
            this.value = value;
        }
        if (severity !== undefined) {
            this.severity = severity;
        }
        if (eventCount !== undefined) {
            this.eventCount = eventCount;
        }
    }
}

// WGS-84 Geo Location
class Location {
    constructor(lat, lon) {
        if (lat !== undefined) {
            this.lat = lat;
        }
        if (lon !== undefined) {
            this.lon = lon;
        }
    }
}

// Login parameters data model
class LoginParams {
    constructor(email, password, accessToken) {
        if (email !== undefined) {
            this.email = email;
        }
        if (password !== undefined) {
            this.password = password;
        }
        if (accessToken !== undefined) {
            this.accessToken = accessToken;
        }
    }
}

// MaliciousIPCard is a data structure representing malicious IP card
class MaliciousIPCard {
    constructor(maliciousIp, countryCode, ipDescription, lastEventTime, attackCategories, numberOfDevices, eventsBySeverityBreakdown) {
        if (maliciousIp !== undefined) {
            this.maliciousIp = maliciousIp;
        }
        if (countryCode !== undefined) {
            this.countryCode = countryCode;
        }
        if (ipDescription !== undefined) {
            this.ipDescription = ipDescription;
        }
        if (lastEventTime !== undefined) {
            this.lastEventTime = lastEventTime;
        }
        if (attackCategories !== undefined) {
            this.attackCategories = attackCategories;
        }
        if (numberOfDevices !== undefined) {
            this.numberOfDevices = numberOfDevices;
        }
        if (eventsBySeverityBreakdown !== undefined) {
            this.eventsBySeverityBreakdown = eventsBySeverityBreakdown;
        }
    }
}

// MaliciousIPData is a data structure representing malicious IP and its statistics
class MaliciousIPData {
    constructor(iP, totalEvents, totalDevices, totalMaliciousIPs) {
        if (iP !== undefined) {
            this.ip = iP;
        }
        if (totalEvents !== undefined) {
            this.totalEvents = totalEvents;
        }
        if (totalDevices !== undefined) {
            this.totalDevices = totalDevices;
        }
        if (totalMaliciousIPs !== undefined) {
            this.totalMaliciousIPs = totalMaliciousIPs;
        }
    }
}

// NetworkMap is a data structure representing a set of nodes and vertex representing a network
class NetworkMap {
    constructor(nodes, links) {
        if (nodes !== undefined) {
            this.nodes = nodes;
        }
        if (links !== undefined) {
            this.links = links;
        }
    }
}

// Node represents a vertex in a network map
class Node {
    constructor(id, name, ip, type, score, tags, labels, eventCount, isGroup, deviceCount) {
        if (id !== undefined) {
            this.id = id;
        }
        if (name !== undefined) {
            this.name = name;
        }
        if (ip !== undefined) {
            this.ip = ip;
        }
        if (type !== undefined) {
            this.type = type;
        }
        if (score !== undefined) {
            this.score = score;
        }
        if (tags !== undefined) {
            this.tags = tags;
        }
        if (labels !== undefined) {
            this.labels = labels;
        }
        if (eventCount !== undefined) {
            this.eventCount = eventCount;
        }
        if (isGroup !== undefined) {
            this.isGroup = isGroup;
        }
        if (deviceCount !== undefined) {
            this.deviceCount = deviceCount;
        }
    }
}

// SeriesData model represents a generic datapoint in interval range
class SeriesData {
    constructor(interval, values) {
        if (interval !== undefined) {
            this.interval = interval;
        }
        if (values !== undefined) {
            this.values = values;
        }
    }
}

// Session data transformation parameters (to calculate z-score)
class SessionTransform {
    constructor(packetsIn, packetsOut, bytesIn, bytesOut) {
        if (packetsIn !== undefined) {
            this.packetsIn = packetsIn;
        }
        if (packetsOut !== undefined) {
            this.packetsOut = packetsOut;
        }
        if (bytesIn !== undefined) {
            this.bytesIn = bytesIn;
        }
        if (bytesOut !== undefined) {
            this.bytesOut = bytesOut;
        }
    }
}

// SeverityIntervalTuple  is tuple of SeverityTypeCode and Interval
class SeverityIntervalTuple {
    constructor(severity, interval) {
        if (severity !== undefined) {
            this.severity = severity;
        }
        if (interval !== undefined) {
            this.interval = interval;
        }
    }
}

// ShieldexConfig is a shieldex configuration values
class ShieldexConfig {
    constructor(alphaWeightFactor, percentFactor) {
        if (alphaWeightFactor !== undefined) {
            this.alphaWeightFactor = alphaWeightFactor;
        }
        if (percentFactor !== undefined) {
            this.percentFactor = percentFactor;
        }
    }
}

// String Int Value tuple
class StringIntValue {
    constructor(key, value) {
        if (key !== undefined) {
            this.key = key;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
}

// Key Value string  to int tuple
class StringKeyIntValue {
    constructor(key, value) {
        if (key !== undefined) {
            this.key = key;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
}

// Key Value string tuple
class StringKeyValue {
    constructor(key, value) {
        if (key !== undefined) {
            this.key = key;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
}

// Thresholds is a list of stream configuration thresholds
class Thresholds {
    constructor(inactiveDeviceWindowMin) {
        if (inactiveDeviceWindowMin !== undefined) {
            this.inactiveDeviceWindowMin = inactiveDeviceWindowMin;
        }
    }
}

// TimeDataPoint model represents a generic datapoint in time
class TimeDataPoint {
    constructor(timestamp, value) {
        if (timestamp !== undefined) {
            this.timestamp = timestamp;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
}

// TimeDataPoint2D model represents a 2 dimensions datapoint in time
class TimeDataPoint2D {
    constructor(timestamp, value) {
        if (timestamp !== undefined) {
            this.timestamp = timestamp;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
}

// TimeDataPointFloat model represents a float datapoint in time
class TimeDataPointFloat {
    constructor(timestamp, value) {
        if (timestamp !== undefined) {
            this.timestamp = timestamp;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
}

// TimeFrame represents a finite time window (from - to)
class TimeFrame {
    constructor(from, to) {
        if (from !== undefined) {
            this.from = from;
        }
        if (to !== undefined) {
            this.to = to;
        }
    }
}

// TimeSeries model represents a generic set of data points over time
class TimeSeries {
    constructor(name, range, values) {
        if (name !== undefined) {
            this.name = name;
        }
        if (range !== undefined) {
            this.range = range;
        }
        if (values !== undefined) {
            this.values = values;
        }
    }
}

// TimeSeriesOf2D model represents a 2 dimension samples over time
class TimeSeriesOf2D {
    constructor(name, range, values) {
        if (name !== undefined) {
            this.name = name;
        }
        if (range !== undefined) {
            this.range = range;
        }
        if (values !== undefined) {
            this.values = values;
        }
    }
}

// TimeSeriesOfDataConsumption model represents a data consumption (in, out, total Kb) samples over time
class TimeSeriesOfDataConsumption {
    constructor(name, range, values) {
        if (name !== undefined) {
            this.name = name;
        }
        if (range !== undefined) {
            this.range = range;
        }
        if (values !== undefined) {
            this.values = values;
        }
    }
}

// TimeSeriesOfFloat model represents a float set of data points over time
class TimeSeriesOfFloat {
    constructor(name, range, values) {
        if (name !== undefined) {
            this.name = name;
        }
        if (range !== undefined) {
            this.range = range;
        }
        if (values !== undefined) {
            this.values = values;
        }
    }
}

// TokenData model represents a user in account which is encrypted with the JWT token
class TokenData {
    constructor(accountId, subjectId, subjectType, role, status, expiresIn) {
        if (accountId !== undefined) {
            this.accountId = accountId;
        }
        if (subjectId !== undefined) {
            this.subjectId = subjectId;
        }
        if (subjectType !== undefined) {
            this.subjectType = subjectType;
        }
        if (role !== undefined) {
            this.role = role;
        }
        if (status !== undefined) {
            this.status = status;
        }
        if (expiresIn !== undefined) {
            this.expiresIn = expiresIn;
        }
    }
}

// Usage data transformation parameters (to calculate z-score)
class UsageTransform {
    constructor(packetsIn, packetsOut, bytesIn, bytesOut, endpointsCount, portsCount) {
        if (packetsIn !== undefined) {
            this.packetsIn = packetsIn;
        }
        if (packetsOut !== undefined) {
            this.packetsOut = packetsOut;
        }
        if (bytesIn !== undefined) {
            this.bytesIn = bytesIn;
        }
        if (bytesOut !== undefined) {
            this.bytesOut = bytesOut;
        }
        if (endpointsCount !== undefined) {
            this.endpointsCount = endpointsCount;
        }
        if (portsCount !== undefined) {
            this.portsCount = portsCount;
        }
    }
}

// ZScore parameters
class ZScore {
    constructor(mean, sD) {
        if (mean !== undefined) {
            this.mean = mean;
        }
        if (sD !== undefined) {
            this.sD = sD;
        }
    }
}

// Base entity includes common fields for all entities (persistence objects) in the system
class BaseEntity {
    constructor(id, createdOn, updatedOn) {
        if (id !== undefined) {
            this.id = id;
        }
        if (createdOn !== undefined) {
            this.createdOn = createdOn;
        }
        if (updatedOn !== undefined) {
            this.updatedOn = updatedOn;
        }
    }
}

// Account entity in the system represents customer account
class Account extends BaseEntity {
}

// AccountDTO includes additional data for display
class AccountDTO extends BaseEntity {
}

// AccountSettings is a set of account attributes
class AccountSettings {
    constructor(logo, defaultHomePageView) {
        if (logo !== undefined) {
            this.logo = logo;
        }
        if (defaultHomePageView !== undefined) {
            this.defaultHomePageView = defaultHomePageView;
        }
    }
}

// Audit Log - each entry represents a single action done by user
class AuditLog extends BaseEntity {
}

// Checkpoint represents parsing status in time that preserves parsing cycle statistics and last checkpoint (timestamp) to avoid parsing the same files over and over again
class Checkpoint extends BaseEntity {
}

class Condition {
    constructor(field, operator, values) {
        if (field !== undefined) {
            this.field = field;
        }
        if (operator !== undefined) {
            this.operator = operator;
        }
        if (values !== undefined) {
            this.values = values;
        }
    }
}

// DNSRecord represents network statistics of DNS requests
// The createdOn field represents the first communication time of the device within this time window
// The updatedOn field represents the last communication time of the device within this time window
class DNSRecord extends BaseEntity {
}

// DataIngestion is the ingestion pipeline configuration
class DataIngestion {
    constructor(inputURI, format, archiveURI, inputFilesExt, subNets, exclude, usageTimeWindowSec, sessionTimeWindowSec, schedule, defaultDeviceType, deviceCreationPolicy, deviceIdentityPolicy) {
        if (inputURI !== undefined) {
            this.inputURI = inputURI;
        }
        if (format !== undefined) {
            this.format = format;
        }
        if (archiveURI !== undefined) {
            this.archiveURI = archiveURI;
        }
        if (inputFilesExt !== undefined) {
            this.inputFilesExt = inputFilesExt;
        }
        if (subNets !== undefined) {
            this.subNets = subNets;
        }
        if (exclude !== undefined) {
            this.exclude = exclude;
        }
        if (usageTimeWindowSec !== undefined) {
            this.usageTimeWindowSec = usageTimeWindowSec;
        }
        if (sessionTimeWindowSec !== undefined) {
            this.sessionTimeWindowSec = sessionTimeWindowSec;
        }
        if (schedule !== undefined) {
            this.schedule = schedule;
        }
        if (defaultDeviceType !== undefined) {
            this.defaultDeviceType = defaultDeviceType;
        }
        if (deviceCreationPolicy !== undefined) {
            this.deviceCreationPolicy = deviceCreationPolicy;
        }
        if (deviceIdentityPolicy !== undefined) {
            this.deviceIdentityPolicy = deviceIdentityPolicy;
        }
    }
}

// TimeSeriesOfDeviceReport model represents a time series of DeviceReport
class DataPointOfDeviceReport {
    constructor(timestamp, value) {
        if (timestamp !== undefined) {
            this.timestamp = timestamp;
        }
        if (value !== undefined) {
            this.value = value;
        }
    }
}

// Device entity is an IoT device representation with attributes and state
class Device extends BaseEntity {
}

// DeviceReport is a periodic (usually daily) snapshot on status of all devices, field createdOn indicates the snapshot time
class DeviceReport extends BaseEntity {
}

// DeviceWithEvents entity is a device with its related events (for display only)
class DeviceWithEvents extends BaseEntity {
}

// Cyber event entity
// The Event entity is created by multiple services (e.g. ip reputation, static rules, anomaly detection) by analyzing network statistics (usage and session data) and related to specific IP address.
// Since it is not always clear what is the actual device with the IP address (RADIUS or DIAMETER logs can be provided later), we should be able to create event without device Id and assign the device Id later on.
// For this purpose, when the device Id is not provided, the event will be created with the `unknown` value in the deviceId field and the eventId must follow the following pattern: streamId:timestamp:ip_address
class Event extends BaseEntity {
}

// A single instance of event generated for the same deviceId based on the same rule on the same month
class EventOccurrence {
    constructor(timestamp, source, sourceIp, indicators, trafficDirection) {
        if (timestamp !== undefined) {
            this.timestamp = timestamp;
        }
        if (source !== undefined) {
            this.source = source;
        }
        if (sourceIp !== undefined) {
            this.sourceIp = sourceIp;
        }
        if (indicators !== undefined) {
            this.indicators = indicators;
        }
        if (trafficDirection !== undefined) {
            this.trafficDirection = trafficDirection;
        }
    }
}

// EventWithDevice entity is an event with the device information (for display only)
class EventWithDevice extends BaseEntity {
}

// Feature entity is capability in the system used for feature toggle
class Feature extends BaseEntity {
}

// FeaturesGroup group represents a group of capabilities in the system used for feature toggle
class FeaturesGroup extends BaseEntity {
}

// Insight
// The Insight entity is created by the insights micro service and represents an account-wide insight.
class Insight extends BaseEntity {
}

// InsightQuery
// The InsightQuery entity is a definition of insight query to execute periodically in order to generate "insights" for the users.
class InsightQuery extends BaseEntity {
}

// InsightSpec
// The InsightSpec entity is a link between account and stream Id to insight query.
class InsightSpec extends BaseEntity {
}

// IntDistribution model represents a grouped counts of elements of type int (usually enum)
class IntDistribution {
    constructor(name, total, values) {
        if (name !== undefined) {
            this.name = name;
        }
        if (total !== undefined) {
            this.total = total;
        }
        if (values !== undefined) {
            this.values = values;
        }
    }
}

// Integration specifications
class Integration extends BaseEntity {
}

// Member represents a user in the account and the role he has in this account
// User may have several memberships for several accounts, each with a different role
class Member extends BaseEntity {
}

// Radius entity is an IP allocation to device IMSI entry
class Radius extends BaseEntity {
}

// Deterministic Rule definition
class Rule extends BaseEntity {
}

// RuleTemplate entity is used to define rules quickly based on pre-defined templates
class RuleTemplate extends BaseEntity {
}

// SIM entity represents a physical SIM (Subscriber Identity Module) card used in an IoT device to access the internet via a cellular provider
class SIM {
    constructor(id, iP, iCCID, iMSI, mSISDN) {
        if (id !== undefined) {
            this.id = id;
        }
        if (iP !== undefined) {
            this.ip = iP;
        }
        if (iCCID !== undefined) {
            this.iccid = iCCID;
        }
        if (iMSI !== undefined) {
            this.imsi = iMSI;
        }
        if (mSISDN !== undefined) {
            this.msisdn = mSISDN;
        }
    }
}

// SessionRecord represents network statistics for a session
// The unique Id of session record is based on the template: [window_start_time]-[device_id]-[session_id]
// The createdOn field represents the first communication time of the device within this time window
// The updatedOn field represents the last communication time of the device within this time window
class SessionRecord extends BaseEntity {
}

// Shieldex is a security score per account level calculated periodically
class Shieldex extends BaseEntity {
}

// Stream represents data stream configuration for group of identical IoT devices service the same purpose and sharing the same attributes (e.g. water meter, point-of-sale, ATM IP camera etc)
class Stream extends BaseEntity {
}

// StreamConfig is a stream configuration description
class StreamConfig {
    constructor(ingest, sessionTransform, usageTransform, thresholds, shieldexConfig, eventSeverityConfig) {
        if (ingest !== undefined) {
            this.ingest = ingest;
        }
        if (sessionTransform !== undefined) {
            this.sessionTransform = sessionTransform;
        }
        if (usageTransform !== undefined) {
            this.usageTransform = usageTransform;
        }
        if (thresholds !== undefined) {
            this.thresholds = thresholds;
        }
        if (shieldexConfig !== undefined) {
            this.shieldexConfig = shieldexConfig;
        }
        if (eventSeverityConfig !== undefined) {
            this.eventSeverityConfig = eventSeverityConfig;
        }
    }
}

// TimeSeriesOfDeviceReport model represents a time series of DeviceReport
class TimeSeriesOfDeviceReport {
    constructor(name, range, values) {
        if (name !== undefined) {
            this.name = name;
        }
        if (range !== undefined) {
            this.range = range;
        }
        if (values !== undefined) {
            this.values = values;
        }
    }
}

// UsageRecord represents network statistics
// The unique Id of usage record is based on the template: [window_start_time]-[stream_id]-[device_id]
// The createdOn field represents the first communication time of the device within this time window
// The updatedOn field represents the last communication time of the device within this time window
class UsageRecord extends BaseEntity {
}

// User represents a human / system operator that has access to the system, and can perform operations
// User authentication is done by an external identity provider
class User extends BaseEntity {
}

// UserMembership model include user data with a specific account membership
class UserMembership extends BaseEntity {
}

// UserMemberships model include user data and all its accounts memberships
class UserMemberships extends BaseEntity {
}

// Account status code
var AccountStatusCode;
(function (AccountStatusCode) {
    // Undefined [0] 
    AccountStatusCode[AccountStatusCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Active account [1] 
    AccountStatusCode[AccountStatusCode["ACTIVE"] = 1] = "ACTIVE";
    // Suspended (non-active) account [2] 
    AccountStatusCode[AccountStatusCode["SUSPENDED"] = 2] = "SUSPENDED";
    // Deleted account [3] 
    AccountStatusCode[AccountStatusCode["DELETED"] = 3] = "DELETED";
})(AccountStatusCode || (AccountStatusCode = {}));
// Return list of AccountStatusCode values and their display names
function GetAccountStatusCodes() {
    let result = new Map();
    result.set(AccountStatusCode.UNDEFINED, 'Undefined');
    result.set(AccountStatusCode.ACTIVE, 'Active');
    result.set(AccountStatusCode.SUSPENDED, 'Suspended');
    result.set(AccountStatusCode.DELETED, 'Deleted');
    return result;
}

// Account type code
var AccountTypeCode;
(function (AccountTypeCode) {
    // Undefined [0] 
    AccountTypeCode[AccountTypeCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Demo account for internal use [1] 
    AccountTypeCode[AccountTypeCode["DEMO"] = 1] = "DEMO";
    // Trial account for pilots [2] 
    AccountTypeCode[AccountTypeCode["TRIAL"] = 2] = "TRIAL";
    // Active account for partner [3] 
    AccountTypeCode[AccountTypeCode["PARTNER"] = 3] = "PARTNER";
    // Active account for paying customers [4] 
    AccountTypeCode[AccountTypeCode["CUSTOMER"] = 4] = "CUSTOMER";
})(AccountTypeCode || (AccountTypeCode = {}));
// Return list of AccountTypeCode values and their display names
function GetAccountTypeCodes() {
    let result = new Map();
    result.set(AccountTypeCode.UNDEFINED, 'Undefined');
    result.set(AccountTypeCode.DEMO, 'Demo');
    result.set(AccountTypeCode.TRIAL, 'Trial');
    result.set(AccountTypeCode.PARTNER, 'Partner');
    result.set(AccountTypeCode.CUSTOMER, 'Customer');
    return result;
}

// Device action code
var DeviceActionCode;
(function (DeviceActionCode) {
    // Undefined [0] 
    DeviceActionCode[DeviceActionCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Redirect device traffic [1] 
    DeviceActionCode[DeviceActionCode["REDIRECT"] = 1] = "REDIRECT";
    // Block device [2] 
    DeviceActionCode[DeviceActionCode["BLOCK"] = 2] = "BLOCK";
    // Throttle device traffic [3] 
    DeviceActionCode[DeviceActionCode["THROTTLE"] = 3] = "THROTTLE";
})(DeviceActionCode || (DeviceActionCode = {}));
// Return list of DeviceActionCode values and their display names
function GetDeviceActionCodes() {
    let result = new Map();
    result.set(DeviceActionCode.UNDEFINED, 'Undefined');
    result.set(DeviceActionCode.REDIRECT, 'Redirect');
    result.set(DeviceActionCode.BLOCK, 'Block');
    result.set(DeviceActionCode.THROTTLE, 'Throttle');
    return result;
}

// Device creation policy code
var DeviceCreationCode;
(function (DeviceCreationCode) {
    // Undefined [0] 
    DeviceCreationCode[DeviceCreationCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Do not create device [1] 
    DeviceCreationCode[DeviceCreationCode["NONE"] = 1] = "NONE";
    // Create Device based on static IP [2] 
    DeviceCreationCode[DeviceCreationCode["IP"] = 2] = "IP";
    // Create Device based on Subscriber Id - IMSI [3] 
    DeviceCreationCode[DeviceCreationCode["SID"] = 3] = "SID";
    // Create Device based on Equipment Id - IMEI [4] 
    DeviceCreationCode[DeviceCreationCode["EID"] = 4] = "EID";
})(DeviceCreationCode || (DeviceCreationCode = {}));
// Return list of DeviceCreationCode values and their display names
function GetDeviceCreationCodes() {
    let result = new Map();
    result.set(DeviceCreationCode.UNDEFINED, 'Undefined');
    result.set(DeviceCreationCode.NONE, 'None');
    result.set(DeviceCreationCode.IP, 'Ip');
    result.set(DeviceCreationCode.SID, 'Sid');
    result.set(DeviceCreationCode.EID, 'Eid');
    return result;
}

// Set the device unique identity policy
var DeviceIdentityCode;
(function (DeviceIdentityCode) {
    // Undefined [0] 
    DeviceIdentityCode[DeviceIdentityCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Device Identity is provided by the system [1] 
    DeviceIdentityCode[DeviceIdentityCode["AUTO"] = 1] = "AUTO";
    // Device Identity is based on static IP: ip@stream_id [2] 
    DeviceIdentityCode[DeviceIdentityCode["IP"] = 2] = "IP";
    // Device Identity is based on Subscriber Id: imsi@stream_id [3] 
    DeviceIdentityCode[DeviceIdentityCode["SID"] = 3] = "SID";
    // Device Identity is based on Equipment Id: imei@stream_id [4] 
    DeviceIdentityCode[DeviceIdentityCode["EID"] = 4] = "EID";
    // Device Identity is based on MAC address: mac@stream_id [4] 
    DeviceIdentityCode[DeviceIdentityCode["MAC"] = 5] = "MAC";
})(DeviceIdentityCode || (DeviceIdentityCode = {}));
// Return list of DeviceIdentityCode values and their display names
function GetDeviceIdentityCodes() {
    let result = new Map();
    result.set(DeviceIdentityCode.UNDEFINED, 'Undefined');
    result.set(DeviceIdentityCode.AUTO, 'Auto');
    result.set(DeviceIdentityCode.IP, 'Ip');
    result.set(DeviceIdentityCode.SID, 'Sid');
    result.set(DeviceIdentityCode.EID, 'Eid');
    result.set(DeviceIdentityCode.MAC, 'Mac');
    return result;
}

// Device status code
var DeviceStatusCode;
(function (DeviceStatusCode) {
    // Undefined [0] 
    DeviceStatusCode[DeviceStatusCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Device is registered and pending verification [1] 
    DeviceStatusCode[DeviceStatusCode["PENDING"] = 1] = "PENDING";
    // Active device in the system [2] 
    DeviceStatusCode[DeviceStatusCode["ACTIVE"] = 2] = "ACTIVE";
    // Inactive device [3] 
    DeviceStatusCode[DeviceStatusCode["INACTIVE"] = 3] = "INACTIVE";
    // Blocked device [4] 
    DeviceStatusCode[DeviceStatusCode["BLOCKED"] = 4] = "BLOCKED";
})(DeviceStatusCode || (DeviceStatusCode = {}));
// Return list of DeviceStatusCode values and their display names
function GetDeviceStatusCodes() {
    let result = new Map();
    result.set(DeviceStatusCode.UNDEFINED, 'Undefined');
    result.set(DeviceStatusCode.PENDING, 'Pending');
    result.set(DeviceStatusCode.ACTIVE, 'Active');
    result.set(DeviceStatusCode.INACTIVE, 'Inactive');
    result.set(DeviceStatusCode.BLOCKED, 'Blocked');
    return result;
}

// Device type code
var DeviceTypeCode;
(function (DeviceTypeCode) {
    // Undefined [0] 
    DeviceTypeCode[DeviceTypeCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Other (Unknown Device) [1] 
    DeviceTypeCode[DeviceTypeCode["OTHER"] = 1] = "OTHER";
    // Industrial Controller [2] 
    DeviceTypeCode[DeviceTypeCode["CONTROLLER"] = 2] = "CONTROLLER";
    // General smart meter [3] 
    DeviceTypeCode[DeviceTypeCode["METER"] = 3] = "METER";
    // General sensor [4] 
    DeviceTypeCode[DeviceTypeCode["SENSOR"] = 4] = "SENSOR";
    // General camera [5] 
    DeviceTypeCode[DeviceTypeCode["CAMERA"] = 5] = "CAMERA";
    // Point of sale [6] 
    DeviceTypeCode[DeviceTypeCode["POS"] = 6] = "POS";
    // Pump [7] 
    DeviceTypeCode[DeviceTypeCode["PUMP"] = 7] = "PUMP";
    // EV charging station [8] 
    DeviceTypeCode[DeviceTypeCode["CHARGING_STATION"] = 8] = "CHARGING_STATION";
    // Smart lightning [9] 
    DeviceTypeCode[DeviceTypeCode["LIGHTNING"] = 9] = "LIGHTNING";
    // Temperature sensor [10] 
    DeviceTypeCode[DeviceTypeCode["TEMPERATURE_SENSOR"] = 10] = "TEMPERATURE_SENSOR";
    // Air Quality sensor [11] 
    DeviceTypeCode[DeviceTypeCode["AIR_QUALITY_SENSOR"] = 11] = "AIR_QUALITY_SENSOR";
    // Valve [12] 
    DeviceTypeCode[DeviceTypeCode["VALVE"] = 12] = "VALVE";
    // Gateway [13] 
    DeviceTypeCode[DeviceTypeCode["GATEWAY"] = 13] = "GATEWAY";
    // ATM [14] 
    DeviceTypeCode[DeviceTypeCode["ATM"] = 14] = "ATM";
})(DeviceTypeCode || (DeviceTypeCode = {}));
// Return list of DeviceTypeCode values and their display names
function GetDeviceTypeCodes() {
    let result = new Map();
    result.set(DeviceTypeCode.UNDEFINED, 'Undefined');
    result.set(DeviceTypeCode.OTHER, 'Other');
    result.set(DeviceTypeCode.CONTROLLER, 'Controller');
    result.set(DeviceTypeCode.METER, 'Meter');
    result.set(DeviceTypeCode.SENSOR, 'Sensor');
    result.set(DeviceTypeCode.CAMERA, 'Camera');
    result.set(DeviceTypeCode.POS, 'Pos');
    result.set(DeviceTypeCode.PUMP, 'Pump');
    result.set(DeviceTypeCode.CHARGING_STATION, 'Charging Station');
    result.set(DeviceTypeCode.LIGHTNING, 'Lightning');
    result.set(DeviceTypeCode.TEMPERATURE_SENSOR, 'Temperature Sensor');
    result.set(DeviceTypeCode.AIR_QUALITY_SENSOR, 'Air Quality Sensor');
    result.set(DeviceTypeCode.VALVE, 'Valve');
    result.set(DeviceTypeCode.GATEWAY, 'Gateway');
    result.set(DeviceTypeCode.ATM, 'Atm');
    return result;
}

// Event category code
var EventCategoryCode;
(function (EventCategoryCode) {
    // Undefined [0] 
    EventCategoryCode[EventCategoryCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Cyber-Security event [1] 
    EventCategoryCode[EventCategoryCode["SECURITY"] = 1] = "SECURITY";
    // Operational event [2] 
    EventCategoryCode[EventCategoryCode["OPERATIONS"] = 2] = "OPERATIONS";
})(EventCategoryCode || (EventCategoryCode = {}));
// Return list of EventCategoryCode values and their display names
function GetEventCategoryCodes() {
    let result = new Map();
    result.set(EventCategoryCode.UNDEFINED, 'Undefined');
    result.set(EventCategoryCode.SECURITY, 'Security');
    result.set(EventCategoryCode.OPERATIONS, 'Operations');
    return result;
}

// Event workflow status code
var EventStatusCode;
(function (EventStatusCode) {
    // Undefined [0] 
    EventStatusCode[EventStatusCode["UNDEFINED"] = 0] = "UNDEFINED";
    // New event [1] 
    EventStatusCode[EventStatusCode["NEW"] = 1] = "NEW";
    // Open event, handled by the operator [2] 
    EventStatusCode[EventStatusCode["OPEN"] = 2] = "OPEN";
    // Closed event (tagged as True event) [3] 
    EventStatusCode[EventStatusCode["CLOSED_TRUE"] = 3] = "CLOSED_TRUE";
    // Closed event (tagged as False event) [4] 
    EventStatusCode[EventStatusCode["CLOSED_FALSE"] = 4] = "CLOSED_FALSE";
})(EventStatusCode || (EventStatusCode = {}));
// Return list of EventStatusCode values and their display names
function GetEventStatusCodes() {
    let result = new Map();
    result.set(EventStatusCode.UNDEFINED, 'Undefined');
    result.set(EventStatusCode.NEW, 'New');
    result.set(EventStatusCode.OPEN, 'Open');
    result.set(EventStatusCode.CLOSED_TRUE, 'Closed True');
    result.set(EventStatusCode.CLOSED_FALSE, 'Closed False');
    return result;
}

// Event type code
var EventTypeCode;
(function (EventTypeCode) {
    // Undefined [0] 
    EventTypeCode[EventTypeCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Other (Unknown Event) [1] 
    EventTypeCode[EventTypeCode["OTHER"] = 1] = "OTHER";
    // Device Takeover [2] 
    EventTypeCode[EventTypeCode["DEVICE_TAKEOVER"] = 2] = "DEVICE_TAKEOVER";
    // DDoS [3] 
    EventTypeCode[EventTypeCode["DDOS"] = 3] = "DDOS";
    // Unknown Malware [4] 
    EventTypeCode[EventTypeCode["UNKNOWN_MALWARE"] = 4] = "UNKNOWN_MALWARE";
    // Man-in-the-Middle [5] 
    EventTypeCode[EventTypeCode["MAN_IN_THE_MIDDLE"] = 5] = "MAN_IN_THE_MIDDLE";
    // Data Theft [6] 
    EventTypeCode[EventTypeCode["DATA_THEFT"] = 6] = "DATA_THEFT";
    // Port Scanning [7] 
    EventTypeCode[EventTypeCode["PORT_SCANNING"] = 7] = "PORT_SCANNING";
    // Abnormal Download [8] 
    EventTypeCode[EventTypeCode["ABNORMAL_DOWNLOAD"] = 8] = "ABNORMAL_DOWNLOAD";
    // Abnormal Incoming Connection [9] 
    EventTypeCode[EventTypeCode["ABNORMAL_INCOMING_CONNECTION"] = 9] = "ABNORMAL_INCOMING_CONNECTION";
    // Unsuccessful Connection Attempts [10] 
    EventTypeCode[EventTypeCode["UNSUCCESSFUL_CONNECTION_ATTEMPTS"] = 10] = "UNSUCCESSFUL_CONNECTION_ATTEMPTS";
    // High Volume Transmit [11] 
    EventTypeCode[EventTypeCode["HIGH_VOLUME_TRANSIT"] = 11] = "HIGH_VOLUME_TRANSIT";
    // Device Level Attack [12] 
    EventTypeCode[EventTypeCode["DEVICE_LEVEL_ATTACK"] = 12] = "DEVICE_LEVEL_ATTACK";
    // Replay Attack [13] 
    EventTypeCode[EventTypeCode["REPLAY_ATTACK"] = 13] = "REPLAY_ATTACK";
    // Attempted Device Takeover [14] 
    EventTypeCode[EventTypeCode["DEVICE_TAKEOVER_ATTEMPT"] = 14] = "DEVICE_TAKEOVER_ATTEMPT";
    // Unknown Operation [15] 
    EventTypeCode[EventTypeCode["UNKNOWN_OPERATION"] = 15] = "UNKNOWN_OPERATION";
    // Crypto Mining [16] 
    EventTypeCode[EventTypeCode["CRYPTO_MINING"] = 16] = "CRYPTO_MINING";
    // Suspicious IP [17] 
    EventTypeCode[EventTypeCode["SUSPICIOUS_IP"] = 17] = "SUSPICIOUS_IP";
    // Abnormal number of outbound ports [18] 
    EventTypeCode[EventTypeCode["ABNORMAL_OUTBOUND_PORTS"] = 18] = "ABNORMAL_OUTBOUND_PORTS";
    // Abnormal number of outbound endpoints (destinations) [19] 
    EventTypeCode[EventTypeCode["ABNORMAL_OUTBOUND_ENDPOINTS"] = 19] = "ABNORMAL_OUTBOUND_ENDPOINTS";
})(EventTypeCode || (EventTypeCode = {}));
// Return list of EventTypeCode values and their display names
function GetEventTypeCodes() {
    let result = new Map();
    result.set(EventTypeCode.UNDEFINED, 'Undefined');
    result.set(EventTypeCode.OTHER, 'Other');
    result.set(EventTypeCode.DEVICE_TAKEOVER, 'Device Takeover');
    result.set(EventTypeCode.DDOS, 'Ddos');
    result.set(EventTypeCode.UNKNOWN_MALWARE, 'Unknown Malware');
    result.set(EventTypeCode.MAN_IN_THE_MIDDLE, 'Man In The Middle');
    result.set(EventTypeCode.DATA_THEFT, 'Data Theft');
    result.set(EventTypeCode.PORT_SCANNING, 'Port Scanning');
    result.set(EventTypeCode.ABNORMAL_DOWNLOAD, 'Abnormal Download');
    result.set(EventTypeCode.ABNORMAL_INCOMING_CONNECTION, 'Abnormal Incoming Connection');
    result.set(EventTypeCode.UNSUCCESSFUL_CONNECTION_ATTEMPTS, 'Unsuccessful Connection Attempts');
    result.set(EventTypeCode.HIGH_VOLUME_TRANSIT, 'High Volume Transit');
    result.set(EventTypeCode.DEVICE_LEVEL_ATTACK, 'Device Level Attack');
    result.set(EventTypeCode.REPLAY_ATTACK, 'Replay Attack');
    result.set(EventTypeCode.DEVICE_TAKEOVER_ATTEMPT, 'Device Takeover Attempt');
    result.set(EventTypeCode.UNKNOWN_OPERATION, 'Unknown Operation');
    result.set(EventTypeCode.CRYPTO_MINING, 'Crypto Mining');
    result.set(EventTypeCode.SUSPICIOUS_IP, 'Suspicious Ip');
    result.set(EventTypeCode.ABNORMAL_OUTBOUND_PORTS, 'Abnormal Outbound Ports');
    result.set(EventTypeCode.ABNORMAL_OUTBOUND_ENDPOINTS, 'Abnormal Outbound Endpoints');
    return result;
}

// Feature code
var FeatureCode;
(function (FeatureCode) {
    // Undefined [0] 
    FeatureCode[FeatureCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Network Map view [1] 
    FeatureCode[FeatureCode["NETWORK_MAP_VIEW"] = 1] = "NETWORK_MAP_VIEW";
    // Network Map module [2] 
    FeatureCode[FeatureCode["NETWORK_MAP_MODULE"] = 2] = "NETWORK_MAP_MODULE";
    // Home Page version 2 [3] 
    FeatureCode[FeatureCode["HOME_PAGE_V2"] = 3] = "HOME_PAGE_V2";
    // Compliance report feature flag [4] 
    FeatureCode[FeatureCode["COMPLIANCE_REPORT"] = 4] = "COMPLIANCE_REPORT";
})(FeatureCode || (FeatureCode = {}));
// Return list of FeatureCode values and their display names
function GetFeatureCodes() {
    let result = new Map();
    result.set(FeatureCode.UNDEFINED, 'Undefined');
    result.set(FeatureCode.NETWORK_MAP_VIEW, 'Network Map View');
    result.set(FeatureCode.NETWORK_MAP_MODULE, 'Network Map Module');
    result.set(FeatureCode.HOME_PAGE_V2, 'Home Page V2');
    result.set(FeatureCode.COMPLIANCE_REPORT, 'Compliance Report');
    return result;
}

// Home Page View code
var HomePageViewCode;
(function (HomePageViewCode) {
    // Undefined [0] 
    HomePageViewCode[HomePageViewCode["UNDEFINED"] = 0] = "UNDEFINED";
    // System view [1] 
    HomePageViewCode[HomePageViewCode["SYSTEM"] = 1] = "SYSTEM";
    // Devices View [2] 
    HomePageViewCode[HomePageViewCode["DEVICES"] = 2] = "DEVICES";
    // Malicious IP view [3] 
    HomePageViewCode[HomePageViewCode["MALICIOUS"] = 3] = "MALICIOUS";
})(HomePageViewCode || (HomePageViewCode = {}));
// Return list of HomePageViewCode values and their display names
function GetHomePageViewCodes() {
    let result = new Map();
    result.set(HomePageViewCode.UNDEFINED, 'Undefined');
    result.set(HomePageViewCode.SYSTEM, 'System');
    result.set(HomePageViewCode.DEVICES, 'Devices');
    result.set(HomePageViewCode.MALICIOUS, 'Malicious');
    return result;
}

// Insight status code
var InsightStatusCode;
(function (InsightStatusCode) {
    // Undefined [0] 
    InsightStatusCode[InsightStatusCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Inactive (muted) insight [1] 
    InsightStatusCode[InsightStatusCode["INACTIVE"] = 1] = "INACTIVE";
    // Pending insight (not visible yet - for testing only) [2] 
    InsightStatusCode[InsightStatusCode["PENDING"] = 2] = "PENDING";
    // Active insight [3] 
    InsightStatusCode[InsightStatusCode["ACTIVE"] = 3] = "ACTIVE";
})(InsightStatusCode || (InsightStatusCode = {}));
// Return list of InsightStatusCode values and their display names
function GetInsightStatusCodes() {
    let result = new Map();
    result.set(InsightStatusCode.UNDEFINED, 'Undefined');
    result.set(InsightStatusCode.INACTIVE, 'Inactive');
    result.set(InsightStatusCode.PENDING, 'Pending');
    result.set(InsightStatusCode.ACTIVE, 'Active');
    return result;
}

// Insight type code
var InsightTypeCode;
(function (InsightTypeCode) {
    // Undefined [0] 
    InsightTypeCode[InsightTypeCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Event Group insight [1] 
    InsightTypeCode[InsightTypeCode["EVENTS"] = 1] = "EVENTS";
    // Statistical insight [2] 
    InsightTypeCode[InsightTypeCode["STATISTICS"] = 2] = "STATISTICS";
})(InsightTypeCode || (InsightTypeCode = {}));
// Return list of InsightTypeCode values and their display names
function GetInsightTypeCodes() {
    let result = new Map();
    result.set(InsightTypeCode.UNDEFINED, 'Undefined');
    result.set(InsightTypeCode.EVENTS, 'Events');
    result.set(InsightTypeCode.STATISTICS, 'Statistics');
    return result;
}

// Integration trigger code
var IntegrationTriggerCode;
(function (IntegrationTriggerCode) {
    // Undefined [0] 
    IntegrationTriggerCode[IntegrationTriggerCode["UNDEFINED"] = 0] = "UNDEFINED";
    // EVENT based integration [1] 
    IntegrationTriggerCode[IntegrationTriggerCode["EVENT"] = 1] = "EVENT";
    // ACTION based integration [2] 
    IntegrationTriggerCode[IntegrationTriggerCode["ACTION"] = 2] = "ACTION";
})(IntegrationTriggerCode || (IntegrationTriggerCode = {}));
// Return list of IntegrationTriggerCode values and their display names
function GetIntegrationTriggerCodes() {
    let result = new Map();
    result.set(IntegrationTriggerCode.UNDEFINED, 'Undefined');
    result.set(IntegrationTriggerCode.EVENT, 'Event');
    result.set(IntegrationTriggerCode.ACTION, 'Action');
    return result;
}

// Integration type code
var IntegrationTypeCode;
(function (IntegrationTypeCode) {
    // Undefined [0] 
    IntegrationTypeCode[IntegrationTypeCode["UNDEFINED"] = 0] = "UNDEFINED";
    // General HTTP(S) based integration [1] 
    IntegrationTypeCode[IntegrationTypeCode["HTTP"] = 1] = "HTTP";
    // General SMTP based integration [2] 
    IntegrationTypeCode[IntegrationTypeCode["SMTP"] = 2] = "SMTP";
    // Internal email service integration [3] 
    IntegrationTypeCode[IntegrationTypeCode["EMAIL"] = 3] = "EMAIL";
    // Internal SMS service integration  [4] 
    IntegrationTypeCode[IntegrationTypeCode["SMS"] = 4] = "SMS";
})(IntegrationTypeCode || (IntegrationTypeCode = {}));
// Return list of IntegrationTypeCode values and their display names
function GetIntegrationTypeCodes() {
    let result = new Map();
    result.set(IntegrationTypeCode.UNDEFINED, 'Undefined');
    result.set(IntegrationTypeCode.HTTP, 'Http');
    result.set(IntegrationTypeCode.SMTP, 'Smtp');
    result.set(IntegrationTypeCode.EMAIL, 'Email');
    result.set(IntegrationTypeCode.SMS, 'Sms');
    return result;
}

// Member role code (represent role of user in the account)
var MemberRoleCode;
(function (MemberRoleCode) {
    // Undefined [0] 
    MemberRoleCode[MemberRoleCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Account administrator can perform all operations [1] 
    MemberRoleCode[MemberRoleCode["ADMIN"] = 1] = "ADMIN";
    // Account operator can perform operations on events only [2] 
    MemberRoleCode[MemberRoleCode["OPERATOR"] = 2] = "OPERATOR";
    // Viewer has read-only permissions [3] 
    MemberRoleCode[MemberRoleCode["VIEWER"] = 3] = "VIEWER";
})(MemberRoleCode || (MemberRoleCode = {}));
// Return list of MemberRoleCode values and their display names
function GetMemberRoleCodes() {
    let result = new Map();
    result.set(MemberRoleCode.UNDEFINED, 'Undefined');
    result.set(MemberRoleCode.ADMIN, 'Admin');
    result.set(MemberRoleCode.OPERATOR, 'Operator');
    result.set(MemberRoleCode.VIEWER, 'Viewer');
    return result;
}

// NetworkMapTypeCode represents the type of network maps
var NetworkMapTypeCode;
(function (NetworkMapTypeCode) {
    // Undefined [0] 
    NetworkMapTypeCode[NetworkMapTypeCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Top devices network map [1] 
    NetworkMapTypeCode[NetworkMapTypeCode["TOP_DEVICES"] = 1] = "TOP_DEVICES";
    // Top malicious IP network map [2] 
    NetworkMapTypeCode[NetworkMapTypeCode["TOP_MALICIOUS_IPS"] = 2] = "TOP_MALICIOUS_IPS";
    // Network devices network map [3] 
    NetworkMapTypeCode[NetworkMapTypeCode["NETWORK"] = 3] = "NETWORK";
})(NetworkMapTypeCode || (NetworkMapTypeCode = {}));
// Return list of NetworkMapTypeCode values and their display names
function GetNetworkMapTypeCodes() {
    let result = new Map();
    result.set(NetworkMapTypeCode.UNDEFINED, 'Undefined');
    result.set(NetworkMapTypeCode.TOP_DEVICES, 'Top Devices');
    result.set(NetworkMapTypeCode.TOP_MALICIOUS_IPS, 'Top Malicious Ips');
    result.set(NetworkMapTypeCode.NETWORK, 'Network');
    return result;
}

// RuleTypeCode represents the sources (engines) of rules
var RuleTypeCode;
(function (RuleTypeCode) {
    // Undefined [0] 
    RuleTypeCode[RuleTypeCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Suspicious IP based on IP reputation engine [1] 
    RuleTypeCode[RuleTypeCode["SUSPICIOUS_IP"] = 1] = "SUSPICIOUS_IP";
    // Static rule based on deterministic rule engine [2] 
    RuleTypeCode[RuleTypeCode["STATIC"] = 2] = "STATIC";
    // Rule based on anomaly detection and classification [3] 
    RuleTypeCode[RuleTypeCode["ANOMALY"] = 3] = "ANOMALY";
})(RuleTypeCode || (RuleTypeCode = {}));
// Return list of RuleTypeCode values and their display names
function GetRuleTypeCodes() {
    let result = new Map();
    result.set(RuleTypeCode.UNDEFINED, 'Undefined');
    result.set(RuleTypeCode.SUSPICIOUS_IP, 'Suspicious Ip');
    result.set(RuleTypeCode.STATIC, 'Static');
    result.set(RuleTypeCode.ANOMALY, 'Anomaly');
    return result;
}

// Severity type (level) code
var SeverityTypeCode;
(function (SeverityTypeCode) {
    // Undefined [0] 
    SeverityTypeCode[SeverityTypeCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Low severity [1] 
    SeverityTypeCode[SeverityTypeCode["LOW"] = 1] = "LOW";
    // Medium severity [2] 
    SeverityTypeCode[SeverityTypeCode["MEDIUM"] = 2] = "MEDIUM";
    // High severity [3] 
    SeverityTypeCode[SeverityTypeCode["HIGH"] = 3] = "HIGH";
    // Critical severity [4] 
    SeverityTypeCode[SeverityTypeCode["CRITICAL"] = 4] = "CRITICAL";
})(SeverityTypeCode || (SeverityTypeCode = {}));
// Return list of SeverityTypeCode values and their display names
function GetSeverityTypeCodes() {
    let result = new Map();
    result.set(SeverityTypeCode.UNDEFINED, 'Undefined');
    result.set(SeverityTypeCode.LOW, 'Low');
    result.set(SeverityTypeCode.MEDIUM, 'Medium');
    result.set(SeverityTypeCode.HIGH, 'High');
    result.set(SeverityTypeCode.CRITICAL, 'Critical');
    return result;
}

// Account type code
var TrafficDirectionCode;
(function (TrafficDirectionCode) {
    // Undefined [0] 
    TrafficDirectionCode[TrafficDirectionCode["UNDEFINED"] = 0] = "UNDEFINED";
    // Denotes inbound network traffic  [1] 
    TrafficDirectionCode[TrafficDirectionCode["INBOUND"] = 1] = "INBOUND";
    // Denotes outbound network traffic [2] 
    TrafficDirectionCode[TrafficDirectionCode["OUTBOUND"] = 2] = "OUTBOUND";
    // Denotes bidirectional network traffic [3] 
    TrafficDirectionCode[TrafficDirectionCode["INOUT"] = 3] = "INOUT";
})(TrafficDirectionCode || (TrafficDirectionCode = {}));
// Return list of TrafficDirectionCode values and their display names
function GetTrafficDirectionCodes() {
    let result = new Map();
    result.set(TrafficDirectionCode.UNDEFINED, 'Undefined');
    result.set(TrafficDirectionCode.INBOUND, 'Inbound');
    result.set(TrafficDirectionCode.OUTBOUND, 'Outbound');
    result.set(TrafficDirectionCode.INOUT, 'Inout');
    return result;
}

// User status code
var UserStatusCode;
(function (UserStatusCode) {
    // Undefined [0] 
    UserStatusCode[UserStatusCode["UNDEFINED"] = 0] = "UNDEFINED";
    // User is registered and pending verification [1] 
    UserStatusCode[UserStatusCode["PENDING"] = 1] = "PENDING";
    // Active user in the system [2] 
    UserStatusCode[UserStatusCode["ACTIVE"] = 2] = "ACTIVE";
    // Blocked user (only account system can unblock the user) [4] 
    UserStatusCode[UserStatusCode["BLOCKED"] = 3] = "BLOCKED";
    // Suspended user (about to be deleted) [8] 
    UserStatusCode[UserStatusCode["SUSPENDED"] = 4] = "SUSPENDED";
})(UserStatusCode || (UserStatusCode = {}));
// Return list of UserStatusCode values and their display names
function GetUserStatusCodes() {
    let result = new Map();
    result.set(UserStatusCode.UNDEFINED, 'Undefined');
    result.set(UserStatusCode.PENDING, 'Pending');
    result.set(UserStatusCode.ACTIVE, 'Active');
    result.set(UserStatusCode.BLOCKED, 'Blocked');
    result.set(UserStatusCode.SUSPENDED, 'Suspended');
    return result;
}

// User type code
var UserTypeCode;
(function (UserTypeCode) {
    // Undefined [0] 
    UserTypeCode[UserTypeCode["UNDEFINED"] = 0] = "UNDEFINED";
    // System administrator has access to all accounts and permissions to perform all actions [1] 
    UserTypeCode[UserTypeCode["SYSADMIN"] = 1] = "SYSADMIN";
    // Support user has view permissions only for all accounts that enabled option Enable Support [2] 
    UserTypeCode[UserTypeCode["SUPPORT"] = 2] = "SUPPORT";
    // Account user - has access to specific accounts with role based access control [3] 
    UserTypeCode[UserTypeCode["USER"] = 3] = "USER";
    // Account service - to be used by other systems to perform actions using the API (can't login as a user to the portal)' [4]` 
    UserTypeCode[UserTypeCode["SERVICE"] = 4] = "SERVICE";
})(UserTypeCode || (UserTypeCode = {}));
// Return list of UserTypeCode values and their display names
function GetUserTypeCodes() {
    let result = new Map();
    result.set(UserTypeCode.UNDEFINED, 'Undefined');
    result.set(UserTypeCode.SYSADMIN, 'Sysadmin');
    result.set(UserTypeCode.SUPPORT, 'Support');
    result.set(UserTypeCode.USER, 'User');
    result.set(UserTypeCode.SERVICE, 'Service');
    return result;
}

/*
 * Public API Surface of ngx-pulse-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Account, AccountDTO, AccountRole, AccountSettings, AccountStatusCode, AccountTypeCode, ActionResponse, AuditLog, BaseEntity, BaseRestResponse, Checkpoint, Condition, ConsumptionData, ConsumptionTimeDataPoint, DNSRecord, DataIngestion, DataPointOfDeviceReport, Device, DeviceActionCode, DeviceCreationCode, DeviceIdentityCode, DeviceReport, DeviceStatusCode, DeviceTypeCode, DeviceWithEvents, EntitiesResponse, EntityResponse, Event, EventCategoryCode, EventOccurrence, EventSeverityConfig, EventStatusCode, EventTypeCode, EventWithDevice, Feature, FeatureCode, FeaturesGroup, FloatKeyValue, GeoData, GetAccountStatusCodes, GetAccountTypeCodes, GetDeviceActionCodes, GetDeviceCreationCodes, GetDeviceIdentityCodes, GetDeviceStatusCodes, GetDeviceTypeCodes, GetEventCategoryCodes, GetEventStatusCodes, GetEventTypeCodes, GetFeatureCodes, GetHomePageViewCodes, GetInsightStatusCodes, GetInsightTypeCodes, GetIntegrationTriggerCodes, GetIntegrationTypeCodes, GetMemberRoleCodes, GetNetworkMapTypeCodes, GetRuleTypeCodes, GetSeverityTypeCodes, GetTrafficDirectionCodes, GetUserStatusCodes, GetUserTypeCodes, GraphSeries, HomePageViewCode, Indicator, Insight, InsightQuery, InsightSpec, InsightStatusCode, InsightTypeCode, IntDistribution, IntKeySeriesDataValue, IntKeyValue, Integration, IntegrationTriggerCode, IntegrationTypeCode, Interval, Link, Location, LoginParams, MaliciousIPCard, MaliciousIPData, Member, MemberRoleCode, NetworkMap, NetworkMapTypeCode, NgxPulseLibModule, Node, PulseConfig, Radius, RestUtil, Rule, RuleTemplate, RuleTypeCode, SIM, SeriesData, Services, SessionRecord, SessionTransform, SeverityIntervalTuple, SeverityTypeCode, Shieldex, ShieldexConfig, Stream, StreamConfig, StringIntValue, StringKeyIntValue, StringKeyValue, SysAccountsService, SysAuditLogService, SysCheckpointsService, SysFeaturesService, SysInsightsService, SysMembersService, SysRuleTemplatesService, SysRulesService, SysStreamsService, SysUsersService, Thresholds, TimeDataPoint, TimeDataPoint2D, TimeDataPointFloat, TimeFrame, TimeSeries, TimeSeriesOf2D, TimeSeriesOfDataConsumption, TimeSeriesOfDeviceReport, TimeSeriesOfFloat, TokenData, TrafficDirectionCode, UsageRecord, UsageTransform, User, UserMembership, UserMemberships, UserStatusCode, UserTypeCode, UsrDevicesService, UsrEventsService, UsrInsightsService, UsrIntegrationsService, UsrMembersService, UsrReportsService, UsrRulesService, UsrUserService, ZScore };
//# sourceMappingURL=ngx-pulse-lib.mjs.map
