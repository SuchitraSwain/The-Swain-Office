'use strict';

/**
 * Claude Code < 2.1.92 rejects `--remote-control-session-name-prefix` as an
 * unknown option and never starts. Session identity must ride on `--name`
 * (present on 2.1.83) and the documented env var, never that flag.
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./load-ts.cjs');

const {
  withClaudeSessionIdentity,
  CLAUDE_RC_SESSION_PREFIX_ENV,
  CLAUDE_RC_SESSION_PREFIX_FLAG
} = loadTs('src/shared/agentProvider.ts');

test('names the session with --name and the RC env var, never the 2.1.92-only flag', () => {
  const { args, env } = withClaudeSessionIdentity(['--model', 'sonnet'], {}, 'Michael');
  assert.deepEqual(args, ['--model', 'sonnet', '--name', 'Michael']);
  assert.equal(env[CLAUDE_RC_SESSION_PREFIX_ENV], 'Michael');
  assert.ok(!args.includes(CLAUDE_RC_SESSION_PREFIX_FLAG));
});

test('slugifies the friendly name into a single safe token', () => {
  const { args, env } = withClaudeSessionIdentity([], undefined, ' Dev 1! ');
  assert.deepEqual(args, ['--name', 'Dev-1']);
  assert.equal(env[CLAUDE_RC_SESSION_PREFIX_ENV], 'Dev-1');
});

test('leaves an explicit --name and an already-set env prefix alone', () => {
  const { args, env } = withClaudeSessionIdentity(
    ['--name', 'Pam'],
    { [CLAUDE_RC_SESSION_PREFIX_ENV]: 'kept' },
    'Michael'
  );
  assert.deepEqual(args, ['--name', 'Pam']);
  assert.equal(env[CLAUDE_RC_SESSION_PREFIX_ENV], 'kept');
});

test('blank names add nothing', () => {
  const { args, env } = withClaudeSessionIdentity(['--model', 'opus'], { FOO: '1' }, '   ');
  assert.deepEqual(args, ['--model', 'opus']);
  assert.deepEqual(env, { FOO: '1' });
});

test('does not mutate the input args array', () => {
  const input = ['--model', 'sonnet'];
  withClaudeSessionIdentity(input, {}, 'Jim');
  assert.deepEqual(input, ['--model', 'sonnet']);
});
