/**
 * @fileoverview Convert comment using TypeScript token scanner
 * @author James Henry <https://github.com/JamesHenry>
 * @copyright jQuery Foundation and other contributors, https://jquery.org/
 * MIT License
 */
import ts from 'typescript';
import { ESTreeComment } from './temp-types-based-on-js-source';
/**
 * Convert all comments for the given AST.
 * @param  {ts.SourceFile} ast the AST object
 * @param  {string} code the TypeScript code
 * @returns {ESTreeComment[]}     the converted ESTreeComment
 * @private
 */
export declare function convertComments(ast: ts.SourceFile, code: string): ESTreeComment[];
