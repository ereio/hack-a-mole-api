/* See all available tables */
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

/* See all user activity and queries */
SELECT usename,client_addr,state,query FROM pg_stat_activity;
SELECT COUNT(*) FROM pg_stat_activity;
SELECT query FROM pg_stat_activity;
