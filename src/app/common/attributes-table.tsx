import React from 'react';
import { Grid, CardHeader, CardContent, List, Divider, Card } from '@material-ui/core';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { typography } from 'selfkey-ui/build-esnext/lib/colors';

const styles = (theme: any) => createStyles({
  bold: {
    fontWeight: 600
  },
  padding: {
    marginBottom: '0 !important',
    marginLeft: '0 !important',
    paddingLeft: 0,
    paddingRight: 0
  },
  divider: {
    margin: '0 16px'
  },
  listContainer: {
    marginBottom: '24px'
  },
  term: {
    color: typography,
    fontSize: '16px',
    lineHeight: '20px',
    minWidth: '37%',
    width: '37%'
  },
  describe: {
    fontSize: '16px',
    lineHeight: '20px',
    minWidth: '63%',
    paddingLeft: '10px',
    width: 'calc(63% - 10px)'
  }
});

type AttributesTableProps = WithStyles<typeof styles> & {
  title: string;
  attributes: any[];
}

const AttributesTable = withStyles(styles)(
  ({ classes, title, attributes = [] }: AttributesTableProps) => (
    <Card>
      <CardHeader title={title} />
      <Divider className={classes.divider} />
      <CardContent>
        <List component="dl" className={classes.padding}>
          {attributes.map((attr, idx) => (
            <Grid container className={classes.listContainer} wrap="nowrap" key={idx}>
              <dt className={classes.term}>{attr.name}</dt>
              <dd className={`${classes.describe} ${classes.bold}`}>
                {attr.value || '--'}
              </dd>
            </Grid>
          ))}
        </List>
      </CardContent>
    </Card>
  )
);

export default AttributesTable;
export { AttributesTable };
