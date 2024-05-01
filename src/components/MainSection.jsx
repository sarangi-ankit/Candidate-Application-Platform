import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobList } from '../redux/slice/list';
import { Card, CardContent, Typography, Grid, Container, Button } from '@mui/material';
import './MainSection.css'; // Import CSS file for custom styles

const MainSection = () => {
  const jobList = useSelector((state) => state.list.data?.jdList || []);
  const dispatch = useDispatch();
  const [expandedIndex, setExpandedIndex] = useState(-1);

  useEffect(() => {
    dispatch(fetchJobList());
  }, [dispatch]);

  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px', padding: '20px' }}>
      <Grid container spacing={3}>
        {jobList.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Card className="custom-card" onClick={() => handleExpand(index)}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {item.jobRole}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {item.location}
                </Typography>
                <Typography variant="body1" component="p">
                  <strong>About Company:</strong>{' '}
                  {expandedIndex === index
                    ? item.jobDetailsFromCompany
                    : `${item.jobDetailsFromCompany.slice(0, 300)}...`}
                  {item.jobDetailsFromCompany.length > 300 && (
                    <Button size="small">
                      {expandedIndex === index ? 'Show Less' : 'Load More'}
                    </Button>
                  )}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: '10px' }}>
                  Experience: 3 to 5 years
                </Typography>
                <Button variant="contained" style={{ width: "100%", marginTop: '10px', backgroundColor: "cyan", color: "black" }}>
                  <strong>Easy Apply</strong>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainSection;
